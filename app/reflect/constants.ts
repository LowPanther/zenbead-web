export const WEB_SESSIONS_COLLECTION = "webSessions";

export const SESSION_DURATION_MS = 10 * 60 * 1000;

/** Public QR / redirect origin (must match iOS `DesktopReflectURLParser`). */
export const REFLECT_QR_ORIGIN = "https://www.zenbead.io";

export function reflectPairingUrl(token: string): string {
  const u = new URL("/reflect", REFLECT_QR_ORIGIN);
  u.searchParams.set("token", token);
  return u.toString();
}

/** Local calendar start-of-day in ms — aligns with iOS `Calendar.current.startOfDay(for: Date())` for the user. */
export function localInsightDayStartMs(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Must match `saveWebReflection` Cloud Function cap. */
export const MAX_REFLECTION_LENGTH = 50_000;
