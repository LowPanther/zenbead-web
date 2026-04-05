/**
 * Mirrors iOS `DailyInsightProvider` (live sequence: themed shuffle + list cutover).
 * Keep in sync with `ZenBead/Domain/Services/DailyInsightProvider.swift` and `insightData.json`.
 */

import insightData from "./insightData.json";

const INSIGHT_RNG_SALT = "zenbead.insight.v4";
const LEGACY_INSIGHTS = insightData.legacyInsights as readonly string[];
const EXPANDED_INSIGHTS = insightData.expandedInsights as readonly string[];

/** Match Swift `insightListCutoverDate` — local start of 18 Mar 2025. */
const INSIGHT_LIST_CUTOVER = new Date(2025, 2, 18);
INSIGHT_LIST_CUTOVER.setHours(0, 0, 0, 0);

type InsightTheme =
  | "presenceMoment"
  | "innerTransformation"
  | "natureMetaphor"
  | "mysteryAndZen"
  | "buddhistTaoNonDual"
  | "mindfulnessAndSuffering"
  | "westernClassic"
  | "indigenousAndCommunity"
  | "sufiPoetry"
  | "contemplativeChristian"
  | "modernPsychology"
  | "attentionPractice"
  | "changeAndDifficulty"
  | "relationshipAndSelf"
  | "timeMemoryPresence"
  | "simplicityAndVirtue";

const U64_MASK = BigInt("0xffffffffffffffff");

function u64(n: bigint): bigint {
  return n & U64_MASK;
}

function expandedTheme(index: number): InsightTheme {
  if (index >= 0 && index < 9) return "presenceMoment";
  if (index < 14) return "innerTransformation";
  if (index < 26) return "natureMetaphor";
  if (index < 28) return "mysteryAndZen";
  if (index < 38) return "buddhistTaoNonDual";
  if (index < 41) return "mindfulnessAndSuffering";
  if (index < 54) return "westernClassic";
  if (index < 63) return "indigenousAndCommunity";
  if (index < 73) return "sufiPoetry";
  if (index < 78) return "contemplativeChristian";
  if (index < 90) return "modernPsychology";
  if (index < 97) return "attentionPractice";
  if (index < 109) return "changeAndDifficulty";
  if (index < 117) return "relationshipAndSelf";
  if (index < 123) return "timeMemoryPresence";
  if (index < 129) return "simplicityAndVirtue";
  throw new Error(`Expanded insight index out of range: ${index}`);
}

function legacyTheme(index: number): InsightTheme {
  if (index >= 0 && index < 5) return "presenceMoment";
  if (index < 10) return "innerTransformation";
  if (index < 15) return "natureMetaphor";
  if (index < 20) return "mysteryAndZen";
  if (index < 25) return "mindfulnessAndSuffering";
  if (index < 30) return "westernClassic";
  throw new Error(`Legacy insight index out of range: ${index}`);
}

class DeterministicRNG {
  private state: bigint;

  constructor(seed: bigint) {
    this.state = u64(seed ^ BigInt("0x9e3779b97f4a7c15"));
  }

  nextUInt64(): bigint {
    this.state = u64(this.state + BigInt("0x9e3779b97f4a7c15"));
    let z = this.state;
    z = u64((z ^ (z >> BigInt(30))) * BigInt("0xbf58476d1ce4e5b9"));
    z = u64((z ^ (z >> BigInt(27))) * BigInt("0x94d049bb133111eb"));
    return u64(z ^ (z >> BigInt(31)));
  }

  nextInt(upperBound: number): number {
    if (upperBound <= 0) return 0;
    return Number(this.nextUInt64() % BigInt(upperBound));
  }
}

function stableSeed(dayOrdinal: number): bigint {
  let hash = BigInt("0xcbf29ce484222325");
  const prime = BigInt("0x100000001b3");
  for (const b of new TextEncoder().encode(INSIGHT_RNG_SALT)) {
    hash = u64(hash ^ BigInt(b));
    hash = u64(hash * prime);
  }
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigInt64(0, BigInt(dayOrdinal), true);
  for (const byte of new Uint8Array(buf)) {
    hash = u64(hash ^ BigInt(byte));
    hash = u64(hash * prime);
  }
  return hash;
}

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dayOrdinal(dayStart: Date): number {
  const ref = new Date(2024, 0, 1);
  ref.setHours(0, 0, 0, 0);
  const t = startOfLocalDay(dayStart);
  return Math.round((t.getTime() - ref.getTime()) / 86_400_000);
}

function themeForOrdinalAndIndex(ordinal: number, index: number): InsightTheme {
  const ref = new Date(2024, 0, 1);
  ref.setHours(0, 0, 0, 0);
  const dayDate = new Date(ref);
  dayDate.setDate(dayDate.getDate() + ordinal);
  const start = startOfLocalDay(dayDate);
  if (start.getTime() < INSIGHT_LIST_CUTOVER.getTime()) {
    return legacyTheme(index);
  }
  return expandedTheme(index);
}

function pickIndex(
  dayOrdinalVal: number,
  previousTheme: InsightTheme | null,
  legacyList: readonly string[],
  expandedList: readonly string[],
): number {
  const ref = new Date(2024, 0, 1);
  ref.setHours(0, 0, 0, 0);
  const dayDate = new Date(ref);
  dayDate.setDate(dayDate.getDate() + dayOrdinalVal);
  const dayStart = startOfLocalDay(dayDate);
  const useLegacy = dayStart.getTime() < INSIGHT_LIST_CUTOVER.getTime();
  const list = useLegacy ? legacyList : expandedList;
  const count = list.length;

  const candidates: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = useLegacy ? legacyTheme(i) : expandedTheme(i);
    if (t !== previousTheme) candidates.push(i);
  }
  if (candidates.length === 0) {
    for (let i = 0; i < count; i++) candidates.push(i);
  }

  const rng = new DeterministicRNG(stableSeed(dayOrdinalVal));
  return candidates[rng.nextInt(candidates.length)]!;
}

const insightIndexCache = new Map<number, number>();
let lastComputedOrdinal = -1;
let lastDayTheme: InsightTheme | null = null;

function nextCacheWrite(ordinal: number, idx: number): void {
  insightIndexCache.set(ordinal, idx);
  lastDayTheme = themeForOrdinalAndIndex(ordinal, idx);
  lastComputedOrdinal = ordinal;
}

function ensureComputedUpTo(targetOrdinal: number): void {
  while (lastComputedOrdinal < targetOrdinal) {
    const next = lastComputedOrdinal + 1;
    const idx = pickIndex(
      next,
      lastDayTheme,
      LEGACY_INSIGHTS,
      EXPANDED_INSIGHTS,
    );
    nextCacheWrite(next, idx);
  }
}

function insightIndexForLocalDayStart(dayStart: Date): number {
  const targetStart = startOfLocalDay(dayStart);
  const d = dayOrdinal(targetStart);

  if (d < 0) {
    const list =
      targetStart.getTime() < INSIGHT_LIST_CUTOVER.getTime()
        ? LEGACY_INSIGHTS
        : EXPANDED_INSIGHTS;
    const c = list.length;
    return ((d % c) + c) % c;
  }

  const hit = insightIndexCache.get(d);
  if (hit !== undefined) return hit;
  ensureComputedUpTo(d);
  return insightIndexCache.get(d)!;
}

/**
 * Raw insight string for a local calendar day (same as iOS `getInsight(for:)` / Daily Zen “live” list).
 */
export function getInsightTextForLocalDate(dayStart: Date): string {
  const targetStart = startOfLocalDay(dayStart);
  const idx = insightIndexForLocalDayStart(targetStart);
  const list =
    targetStart.getTime() < INSIGHT_LIST_CUTOVER.getTime()
      ? LEGACY_INSIGHTS
      : EXPANDED_INSIGHTS;
  return list[idx] ?? "";
}

/**
 * Like iOS `String.formattedInsightDisplayText()` (default: paragraph breaks between sentences).
 * Uses `Intl.Segmenter` when available.
 */
export function formatInsightDisplayText(
  text: string,
  compactSentenceBreaks = false,
  /** Web journal: one flowing line, no paragraph gaps between sentences. */
  singleLine = false,
): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const sentences: string[] = [];
  if (
    typeof Intl !== "undefined" &&
    typeof (Intl as unknown as { Segmenter?: unknown }).Segmenter === "function"
  ) {
    const Seg = (
      Intl as unknown as {
        Segmenter: new (
          locales?: string,
          options?: { granularity: string },
        ) => { segment: (s: string) => Iterable<{ segment: string }> };
      }
    ).Segmenter;
    const seg = new Seg(undefined, { granularity: "sentence" });
    for (const { segment } of seg.segment(trimmed)) {
      const s = segment.trim();
      if (s) sentences.push(s);
    }
  }
  if (sentences.length <= 1) return trimmed;
  if (singleLine) return sentences.join(" ");
  const sep = compactSentenceBreaks ? "\n" : "\n\n";
  return sentences.join(sep);
}

/** Insight body for the journal’s insight day (`localInsightDayStartMs()`). */
export function getLiveInsightDisplayTextForInsightDayMs(
  insightDayStartMs: number,
): string {
  const d = new Date(insightDayStartMs);
  const raw = getInsightTextForLocalDate(d);
  return formatInsightDisplayText(raw, false, true);
}
