import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True when all public Firebase web config vars are set (build-time on client). */
export function isFirebaseClientConfigured(): boolean {
  return Object.values(firebaseConfig).every((v) => Boolean(v && String(v).trim() !== ""));
}

function requireConfig(): void {
  if (!isFirebaseClientConfigured()) {
    throw new Error(
      "Missing Firebase configuration. Add NEXT_PUBLIC_FIREBASE_* variables to .env.local (see .env.example).",
    );
  }
}

/**
 * Client-only Firestore access. Do not call from Server Components.
 */
/** Same region as `firebase.json` / deployed `pollWebSession`. */
const FUNCTIONS_REGION = "us-central1";

export function getFirebase(): { app: FirebaseApp; db: Firestore; functions: Functions } {
  if (typeof window === "undefined") {
    throw new Error("getFirebase() is client-only.");
  }
  requireConfig();
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const functions = getFunctions(app, FUNCTIONS_REGION);
  return { app, db, functions };
}
