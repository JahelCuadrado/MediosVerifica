import type { Grade } from "../enums/grade";

/** Supported locales for translated content. */
export type SupportedLocale = "es" | "en" | "ca" | "eu" | "gl";

/** A multilingual string: one value per supported locale. */
export type LocalizedText = Record<SupportedLocale, string>;

/** Score for a single evaluation criterion. */
export interface CriterionScore {
  /** Numeric score from 0 to 10. */
  readonly score: number;
  /** Per-locale justification text explaining the score. */
  readonly justification: LocalizedText;
  /** URLs to evidence supporting the score. */
  readonly evidence: readonly string[];
}

/** Aggregated category within a dimension (reliability or neutrality). */
export interface CategoryScore {
  /** Weight applied to this category (0–1). */
  readonly weight: number;
  /** Weighted score for this category (0–10). */
  readonly score: number;
  /** Individual criterion scores keyed by criterion enum value. */
  readonly criteria: Record<string, CriterionScore>;
}

/** Full score breakdown for one dimension (reliability OR neutrality). */
export interface DimensionScore {
  /** Final weighted score for this dimension (0–10). */
  readonly score: number;
  /** Letter grade derived from the score. */
  readonly grade: Grade;
  /** Breakdown by category. */
  readonly categories: Record<string, CategoryScore>;
}

/** A complete evaluation snapshot for a media outlet at a point in time. */
export interface Evaluation {
  /** SemVer-like version identifier: "YYYY-MM". */
  readonly version: string;
  /** ISO 8601 date when the evaluation was created. */
  readonly date: string;
  /** Identifier of the evaluator (admin handle). */
  readonly evaluator: string;
  /** Reliability dimension scores. */
  readonly reliability: DimensionScore;
  /** Neutrality dimension scores. */
  readonly neutrality: DimensionScore;
  /** Overall blended score (reliability × weight + neutrality × weight). */
  readonly overallScore: number;
  /** Overall blended grade. */
  readonly overallGrade: Grade;
}
