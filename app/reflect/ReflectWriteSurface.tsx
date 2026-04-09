"use client";

import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { getFirebase } from "@/lib/firebase";
import { getLiveInsightDisplayTextForInsightDayMs } from "./dailyInsight";
import {
  localInsightDayStartMs,
  MAX_REFLECTION_LENGTH,
  REFLECT_EDITOR_FONT_STORAGE_KEY,
  REFLECT_EDITOR_FONT_SIZES,
  type ReflectEditorFontSize,
} from "./constants";
import {
  looksLikeHtmlFragment,
  normalizeReflectionLineEndings,
  normalizeReflectionTextForSave,
  plainTextFromHtml,
} from "./reflectionPlainText";
import "./reflect.css";

const FONT_SIZE_LABEL: Record<ReflectEditorFontSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

function countWords(raw: string): number {
  const t = raw.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

function readStoredFontSize(): ReflectEditorFontSize | null {
  try {
    const raw = localStorage.getItem(REFLECT_EDITOR_FONT_STORAGE_KEY);
    if (
      raw === "small" ||
      raw === "medium" ||
      raw === "large"
    ) {
      return raw;
    }
  } catch {
    /* ignore */
  }
  return null;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function ReflectWriteSurface({
  sessionToken,
  onJournalDone,
}: {
  sessionToken: string;
  onJournalDone?: () => void;
}) {
  const writeShellRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editorFontSize, setEditorFontSize] =
    useState<ReflectEditorFontSize>("medium");

  const insightDisplay = useMemo(
    () => getLiveInsightDisplayTextForInsightDayMs(localInsightDayStartMs()),
    [],
  );

  useEffect(() => {
    const stored = readStoredFontSize();
    if (stored) setEditorFontSize(stored);
  }, []);

  const setEditorFontSizePersisted = useCallback((size: ReflectEditorFontSize) => {
    setEditorFontSize(size);
    try {
      localStorage.setItem(REFLECT_EDITOR_FONT_STORAGE_KEY, size);
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    const shell = writeShellRef.current;
    if (!shell) return;

    const nav = document.querySelector(".nav");
    const apply = () => {
      if (!nav) {
        shell.style.removeProperty("--reflect-header-offset");
        return;
      }
      const h = Math.ceil(nav.getBoundingClientRect().height);
      if (h > 0) {
        shell.style.setProperty("--reflect-header-offset", `${h}px`);
      } else {
        shell.style.removeProperty("--reflect-header-offset");
      }
    };

    apply();
    window.addEventListener("resize", apply);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", apply);
    vv?.addEventListener("scroll", apply);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(apply)
        : null;
    if (nav && ro) ro.observe(nav);

    return () => {
      window.removeEventListener("resize", apply);
      vv?.removeEventListener("resize", apply);
      vv?.removeEventListener("scroll", apply);
      ro?.disconnect();
    };
  }, []);

  /**
   * Portaled overlay top inset — read live from `writeShellRef` (never capture ref once in a closure).
   * Refined after layout; render also falls back so the dialog never depends on `!= null` to appear.
   */
  const [postSaveOverlayTopPx, setPostSaveOverlayTopPx] = useState<number | null>(
    null,
  );

  const measurePostSaveOverlayTop = useCallback((): number => {
    const shell = writeShellRef.current;
    if (shell) {
      return Math.round(shell.getBoundingClientRect().top);
    }
    if (typeof document !== "undefined") {
      const nav = document.querySelector(".nav");
      if (nav) {
        return Math.round(nav.getBoundingClientRect().bottom);
      }
    }
    return 72;
  }, []);

  useLayoutEffect(() => {
    if (saveState !== "saved") {
      setPostSaveOverlayTopPx(null);
      return;
    }
    const sync = () => {
      setPostSaveOverlayTopPx(measurePostSaveOverlayTop());
    };
    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
    };
  }, [saveState, measurePostSaveOverlayTop]);

  const wordCount = countWords(text);
  const hasWords = wordCount > 0;
  const canSave =
    hasWords &&
    saveState !== "saving" &&
    saveState !== "saved" &&
    text.length <= MAX_REFLECTION_LENGTH;

  const saveMuted =
    !hasWords && saveState !== "saving" && saveState !== "saved";

  const onSave = useCallback(async () => {
    if (!canSave) return;
    setSaveState("saving");
    setErrorMessage(null);
    try {
      const { functions } = getFirebase();
      const saveWebReflection = httpsCallable(functions, "saveWebReflection");
      await saveWebReflection({
        sessionToken,
        reflectionText: normalizeReflectionTextForSave(text),
        insightDateMs: localInsightDayStartMs(),
      });
      setSaveState("saved");
    } catch (e) {
      console.error(e);
      setSaveState("error");
      if (e instanceof FirebaseError) {
        if (e.code === "functions/failed-precondition") {
          setErrorMessage(
            e.message.includes("Pairing session ended")
              ? e.message
              : "Could not save. This session may have expired.",
          );
        } else if (e.code === "functions/not-found") {
          setErrorMessage("Session not found. Reload the page and pair again.");
        } else if (e.code === "functions/invalid-argument") {
          setErrorMessage(e.message || "Invalid reflection.");
        } else {
          setErrorMessage(e.message || "Could not save. Try again.");
        }
      } else {
        setErrorMessage(
          e instanceof Error ? e.message : "Could not reach the server.",
        );
      }
    }
  }, [canSave, sessionToken, text]);

  const onPaste = useCallback(
    (e: ClipboardEvent<HTMLTextAreaElement>) => {
      const html = e.clipboardData.getData("text/html");
      const plainClip = e.clipboardData.getData("text/plain");
      const insertRaw =
        html && looksLikeHtmlFragment(html)
          ? plainTextFromHtml(html)
          : plainClip;
      if (!insertRaw) return;
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const insertNorm = normalizeReflectionLineEndings(insertRaw);
      const before = text.slice(0, start);
      const after = text.slice(end);
      const room = MAX_REFLECTION_LENGTH - before.length - after.length;
      const insert =
        insertNorm.length <= room
          ? insertNorm
          : insertNorm.slice(0, Math.max(0, room));
      const next = before + insert + after;
      setText(next);
      if (saveState === "error") {
        setSaveState("idle");
        setErrorMessage(null);
      }
      const caret = start + insert.length;
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = caret;
      });
    },
    [text, saveState],
  );

  const disabled = saveState === "saved" || saveState === "saving";

  const handleNewEntry = useCallback(() => {
    setText("");
    setSaveState("idle");
    setErrorMessage(null);
  }, []);

  return (
    <div
      ref={writeShellRef}
      className={
        saveState === "saved"
          ? "reflect-write reflect-write--post-save"
          : "reflect-write"
      }
    >
      <div
        className={
          saveState === "saved"
            ? "reflect-write__content reflect-write__content--blurred"
            : "reflect-write__content"
        }
      >
        <div className="reflect-write__toolbar">
          <div className="reflect-write__insight">
            <p className="reflect-write__insight-label">Today&apos;s Insight</p>
            <p className="reflect-write__insight-text" title={insightDisplay}>
              {insightDisplay}
            </p>
          </div>
          <div
            className="reflect-write__toolbar-sizes"
            role="group"
            aria-label="Editor text size"
          >
            {REFLECT_EDITOR_FONT_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  editorFontSize === size
                    ? "reflect-write__size-btn reflect-write__size-btn--active"
                    : "reflect-write__size-btn"
                }
                onClick={() => setEditorFontSizePersisted(size)}
                disabled={disabled}
                aria-pressed={editorFontSize === size}
                aria-label={`${FONT_SIZE_LABEL[size]} text`}
              >
                {FONT_SIZE_LABEL[size]}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className={`reflect-write__textarea reflect-write__textarea--${editorFontSize}`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (saveState === "error") {
              setSaveState("idle");
              setErrorMessage(null);
            }
          }}
          onPaste={onPaste}
          placeholder="What came up for you?"
          disabled={disabled}
          maxLength={MAX_REFLECTION_LENGTH}
          spellCheck
          autoComplete="off"
          aria-label="Reflection"
        />

        {saveState === "error" && errorMessage && (
          <p className="reflect-write__error reflect-write__error--inline" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      {saveState === "saved" && typeof document !== "undefined"
        ? createPortal(
            <div
              className="reflect-write__post-save-overlay reflect-write__post-save-overlay--portal"
              style={{
                top: postSaveOverlayTopPx ?? measurePostSaveOverlayTop(),
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reflect-post-save-q"
            >
              <div className="reflect-write__post-save-modal">
                <div className="reflect-write__post-save-modal-glow" aria-hidden />
                <div className="reflect-write__post-save-modal-inner">
                  <div className="reflect-write__post-save-badge" aria-hidden>
                    <span className="reflect-write__post-save-badge-mark">✓</span>
                  </div>
                  <p className="reflect-write__post-save-eyebrow">Saved</p>
                  <h2
                    className="reflect-write__post-save-title"
                    id="reflect-post-save-q"
                  >
                    Would you like to journal some more?
                  </h2>
                  <p className="reflect-write__post-save-lede">
                    Your reflection is in ZenBead. Write another entry, or finish to
                    get a fresh pairing code.
                  </p>
                  <div
                    className="reflect-write__post-save-actions"
                    role="group"
                    aria-labelledby="reflect-post-save-q"
                  >
                    <button
                      type="button"
                      className="reflect-write__widget-btn reflect-write__widget-btn--secondary"
                      onClick={handleNewEntry}
                    >
                      New entry
                    </button>
                    <button
                      type="button"
                      className="reflect-write__widget-btn reflect-write__widget-btn--primary"
                      onClick={() => onJournalDone?.()}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {saveState !== "saved" && (
        <div className="reflect-write__bottom-row">
          <footer className="reflect-write__footer" aria-live="polite">
            <div className="reflect-write__footer-inner">
              <>
                <p
                  className={
                    !hasWords
                      ? "reflect-write__footer-text reflect-write__footer-text--hint reflect-write__footer-text--show"
                      : "reflect-write__footer-text reflect-write__footer-text--hint reflect-write__footer-text--hide"
                  }
                >
                  Take your time.
                </p>
                <p
                  className={
                    hasWords
                      ? "reflect-write__footer-text reflect-write__footer-text--show"
                      : "reflect-write__footer-text reflect-write__footer-text--hide"
                  }
                >
                  {wordCount} {wordCount === 1 ? "word" : "words"}
                </p>
              </>
            </div>
          </footer>

          <button
            type="button"
            className={
              saveMuted
                ? "reflect-write__save reflect-write__save--muted"
                : "reflect-write__save"
            }
            onClick={() => void onSave()}
            disabled={saveState === "saving" || (hasWords && !canSave)}
            aria-disabled={saveMuted ? true : undefined}
          >
            {saveState === "saving" ? "Saving…" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
