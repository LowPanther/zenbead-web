"use client";

import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getFirebase, isFirebaseClientConfigured } from "@/lib/firebase";
import {
  reflectPairingUrl,
  SESSION_DURATION_MS,
  WEB_SESSIONS_COLLECTION,
} from "./constants";
import { ReflectWriteSurface } from "./ReflectWriteSurface";
import "./reflect.css";

type Phase =
  | "loading"
  | "config_missing"
  | "qr"
  | "expired"
  | "error"
  | "authenticated";

function formatMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * Pairing (Tasks 1–2): `webSessions` + QR + `pollWebSession`.
 * Writing (Task 3): `ReflectWriteSurface` + `saveWebReflection` Cloud Function.
 */
export function ReflectSessionClient() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [expiresAtMs, setExpiresAtMs] = useState<number | null>(null);
  const [remainingSec, setRemainingSec] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const qrValue = useMemo(
    () => (sessionToken ? reflectPairingUrl(sessionToken) : ""),
    [sessionToken],
  );

  const bootstrapSession = useCallback(async () => {
    setPhase("loading");
    setErrorMessage(null);
    setExpiresAtMs(null);
    setSessionToken(null);

    if (!isFirebaseClientConfigured()) {
      setPhase("config_missing");
      return;
    }

    const token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

    const created = new Date();
    const expires = new Date(created.getTime() + SESSION_DURATION_MS);

    try {
      const { db } = getFirebase();
      await setDoc(doc(db, WEB_SESSIONS_COLLECTION, token), {
        sessionToken: token,
        status: "pending",
        userId: "",
        createdAt: Timestamp.fromDate(created),
        expiresAt: Timestamp.fromDate(expires),
      });
      setSessionToken(token);
      setExpiresAtMs(expires.getTime());
      setPhase("qr");
    } catch (e) {
      console.error(e);
      setErrorMessage(
        e instanceof Error ? e.message : "Could not start session. Try again.",
      );
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    void bootstrapSession();
  }, [bootstrapSession]);

  /*
   * Task 2: wait until iOS marks the session `authenticated`.
   * Uses Cloud Function `pollWebSession` (Admin listener) — not Firestore `onSnapshot`, because
   * `webSessions` read is denied for unauthenticated web clients.
   */
  useEffect(() => {
    if (!sessionToken || phase !== "qr") return;

    let cancelled = false;

    const run = async () => {
      try {
        const { functions } = getFirebase();
        const pollWebSession = httpsCallable(functions, "pollWebSession");
        const res = await pollWebSession({ sessionToken });
        if (cancelled || phaseRef.current !== "qr") return;

        const data = res.data as { status?: string; userId?: string };
        if (data.status === "authenticated" && data.userId) {
          setPhase("authenticated");
        }
      } catch (e) {
        if (cancelled || phaseRef.current !== "qr") return;

        if (e instanceof FirebaseError) {
          const code = e.code;
          if (
            code === "functions/failed-precondition" ||
            code === "functions/deadline-exceeded"
          ) {
            setPhase("expired");
            return;
          }
          if (code === "functions/not-found") {
            setErrorMessage(
              "This session wasn’t found. Generate a new code on this page.",
            );
            setPhase("error");
            return;
          }
        }
        console.error(e);
        setErrorMessage(
          e instanceof Error
            ? e.message
            : "Something went wrong while waiting for your phone.",
        );
        setPhase("error");
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [sessionToken, phase]);

  /* Countdown (Task 1); also aligns with Task 2 expiry */
  useEffect(() => {
    if (phase !== "qr" || expiresAtMs == null) return;

    const tick = () => {
      const sec = Math.ceil((expiresAtMs - Date.now()) / 1000);
      setRemainingSec(sec);
      if (sec <= 0) setPhase("expired");
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [phase, expiresAtMs]);

  if (phase === "authenticated" && sessionToken) {
    return (
      <div className="reflect reflect--writing">
        <ReflectWriteSurface sessionToken={sessionToken} />
      </div>
    );
  }

  return (
    <div className="reflect">
      <div className="reflect__inner">
        {phase === "loading" && (
          <p className="reflect__timer">Starting session…</p>
        )}

        {phase === "config_missing" && (
          <div className="reflect__config-missing">
            <p className="reflect__instruction reflect__config-missing-lead">
              Journal in the browser isn’t wired up on this copy of the site yet.
            </p>
            <p className="reflect__instruction">
              <strong className="reflect__strong">Local development:</strong> copy{" "}
              <code className="reflect__code">.env.example</code> to{" "}
              <code className="reflect__code">.env.local</code>, then paste your
              Firebase Web app config from the Firebase console (Project settings →
              General → Your apps). Use names like{" "}
              <code className="reflect__code">NEXT_PUBLIC_FIREBASE_API_KEY</code>,{" "}
              <code className="reflect__code">NEXT_PUBLIC_FIREBASE_PROJECT_ID</code>
              , etc. Restart <code className="reflect__code">npm run dev</code> after
              saving.
            </p>
            <p className="reflect__instruction">
              <strong className="reflect__strong">Production:</strong> set the same{" "}
              <code className="reflect__code">NEXT_PUBLIC_FIREBASE_*</code> variables
              in your hosting provider (e.g. Vercel → Environment Variables).
            </p>
            <Link href="/" className="reflect__btn reflect__btn--link">
              Back to home
            </Link>
          </div>
        )}

        {phase === "qr" && sessionToken && (
          <>
            <p className="reflect__instruction">
              Open ZenBead on your phone → <strong>Settings</strong> →{" "}
              <strong>Journal on your computer</strong>, then scan this code.
            </p>
            <div className="reflect__qr-wrap">
              <QRCodeSVG value={qrValue} size={220} level="M" />
            </div>
            <p className="reflect__timer" aria-live="polite">
              Time left: {formatMmSs(remainingSec)}
            </p>
          </>
        )}

        {phase === "expired" && (
          <>
            <p className="reflect__instruction">
              This pairing code has expired. Generate a new one to continue.
            </p>
            <button
              type="button"
              className="reflect__btn"
              onClick={() => void bootstrapSession()}
            >
              Generate a new session
            </button>
          </>
        )}

        {phase === "error" && (
          <>
            {errorMessage && (
              <p className="reflect__error" role="alert">
                {errorMessage}
              </p>
            )}
            <button
              type="button"
              className="reflect__btn"
              onClick={() => void bootstrapSession()}
            >
              Try again
            </button>
          </>
        )}

      </div>
    </div>
  );
}
