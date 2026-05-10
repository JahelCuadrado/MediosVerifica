/** Supported locales in the application. */
export const LOCALES = ["es", "en", "ca", "eu", "gl"] as const;

/** Default locale. */
export const DEFAULT_LOCALE = "es" as const;

/** Human-readable locale names for the language switcher. */
export const LOCALE_NAMES: Record<string, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
  eu: "Euskara",
  gl: "Galego",
};

/** Grade color mapping for UI badges. */
export const GRADE_COLORS: Record<string, { background: string; text: string; border: string }> = {
  A: { background: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  B: { background: "bg-lime-50", text: "text-lime-700", border: "border-lime-200" },
  C: { background: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  D: { background: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  E: { background: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

/** Score color thresholds for progress bars and numeric displays. Aligned with GRADE_THRESHOLDS. */
export function getScoreColor(score: number): string {
  if (score >= 7.5) return "text-emerald-600";
  if (score >= 5.5) return "text-lime-600";
  if (score >= 3.5) return "text-amber-600";
  if (score >= 2) return "text-orange-600";
  return "text-red-600";
}

export function getScoreBarColor(score: number): string {
  if (score >= 7.5) return "bg-emerald-500";
  if (score >= 5.5) return "bg-lime-500";
  if (score >= 3.5) return "bg-amber-500";
  if (score >= 2) return "bg-orange-500";
  return "bg-red-500";
}
