"use client";

import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { useCallback, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { localInsightDayStartMs, MAX_REFLECTION_LENGTH } from "./constants";
import "./reflect.css";

const SAVE_CONFIRM_COPY = "Saved. You can close this tab.";

type SaveState = "idle" | "saving" | "saved" | "error";

export function ReflectWriteSurface({ sessionToken }: { sessionToken: string }) {
  const [text, setText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trimmed = text.trim();
  const canSave =
    trimmed.length > 0 &&
    saveState !== "saving" &&
    saveState !== "saved" &&
    text.length <= MAX_REFLECTION_LENGTH;

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
    <div className="reflect-write">
      <textarea
        className="reflect-write__textarea"
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

      {saveState === "saved" && (
        <p className="reflect-write__confirm" role="status">
          {SAVE_CONFIRM_COPY}
        </p>
      )}

      {saveState === "error" && errorMessage && (
        <p className="reflect-write__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        className="reflect-write__save"
        onClick={() => void onSave()}
        disabled={!canSave}
      >
        {saveState === "saving" ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
