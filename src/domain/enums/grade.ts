/**
 * Rating grade assigned to a media outlet based on its weighted scores.
 * Mirrors the ToS;DR grading scale (A = best, E = worst).
 *
 * v4 recalibration: thresholds lowered to reflect the realistic ceiling
 * of the Spanish media market. With the deterministic rubrics, a "perfect"
 * outlet (BBC, Reuters) would score ~8.0-8.5, so A starts at 7.5.
 */
export enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

/** Human-readable label for each grade (English fallback). */
export const GRADE_LABELS: Record<Grade, string> = {
  [Grade.A]: "Reliable",
  [Grade.B]: "Improvable",
  [Grade.C]: "With reservations",
  [Grade.D]: "Serious",
  [Grade.E]: "Very serious",
};

/** Threshold boundaries: score >= threshold → grade. Ordered descending. */
export const GRADE_THRESHOLDS: ReadonlyArray<{ min: number; grade: Grade }> = [
  { min: 7.5, grade: Grade.A },
  { min: 5.5, grade: Grade.B },
  { min: 3.5, grade: Grade.C },
  { min: 2.0, grade: Grade.D },
  { min: 0.0, grade: Grade.E },
] as const;
