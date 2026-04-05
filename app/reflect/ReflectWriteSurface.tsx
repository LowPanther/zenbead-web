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
} from "react";
import { getFirebase } from "@/lib/firebase";
import { getLiveInsightDisplayTextForInsightDayMs } from "./dailyInsight";
import {
  localInsightDayStartMs,
  MAX_REFLECTION_LENGTH,
  REFLECT_EDITOR_FONT_STORAGE_KEY,
  REFLECT_EDITOR_FONT_SIZES,
  type ReflectEditorFontSize,
} from "./constants";
import "./reflect.css";

const SAVE_CONFIRM_COPY = "Saved. You can close this tab.";

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

export function ReflectWriteSurface({ sessionToken }: { sessionToken: string }) {
  const writeShellRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editorFontSize, setEditorFontSize] =
    useState<ReflectEditorFontSize>("medium");
  const [confirmVisible, setConfirmVisible] = useState(false);

  const insightDisplay = useMemo(
    () => getLiveInsightDisplayTextForInsightDayMs(localInsightDayStartMs()),
    [],
  );

  useEffect(() => {
    const stored = readStoredFontSize();
    if (stored) setEditorFontSize(stored);
  }, []);

  useEffect(() => {
    if (saveState !== "saved") {
      setConfirmVisible(false);
      return;
    }
    let innerId = 0;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => setConfirmVisible(true));
    });
    return () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
    };
  }, [saveState]);

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
        reflectionText: text.trim(),
        insightDateMs: localInsightDayStartMs(),
      });
      setSaveState("saved");
    } catch (e) {
      console.error(e);
      setSaveState("error");
      if (e instanceof FirebaseError) {
        if (e.code === "functions/failed-precondition") {
          setErrorMessage(
            e.message.includes("Already")
              ? "This reflection was already saved."
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

  const disabled = saveState === "saved" || saveState === "saving";

  return (
    <div ref={writeShellRef} className="reflect-write">
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
        placeholder="What came up for you?"
        disabled={disabled}
        maxLength={MAX_REFLECTION_LENGTH}
        spellCheck
        autoComplete="off"
        aria-label="Reflection"
      />

      {saveState === "error" && errorMessage && (
        <p className="reflect-write__error" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="reflect-write__bottom-row">
        <footer className="reflect-write__footer" aria-live="polite">
          <div className="reflect-write__footer-inner">
            {saveState === "saved" ? (
              <p className="reflect-write__footer-text reflect-write__footer-text--show">
                Your reflection has been saved.
              </p>
            ) : (
              <>
                <p
                  className={
                    !hasWords
                      ? "reflect-write__footer-text reflect-write__footer-text--show"
                      : "reflect-write__footer-text reflect-write__footer-text--hide"
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
            )}
          </div>
        </footer>

        {saveState === "saved" && (
          <p
            className={
              confirmVisible
                ? "reflect-write__confirm reflect-write__confirm--visible"
                : "reflect-write__confirm"
            }
            role="status"
          >
            {SAVE_CONFIRM_COPY}
          </p>
        )}

        {saveState !== "saved" && (
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
        )}
      </div>
    </div>
  );
}
