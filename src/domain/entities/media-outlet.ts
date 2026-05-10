import type { Evaluation } from "./evaluation";

/** Type of media outlet. */
export type MediaType =
  | "newspaper"
  | "television"
  | "radio"
  | "digital-native"
  | "news-agency"
  | "magazine";

/** Ownership and funding transparency data. */
export interface OwnershipInfo {
  /** Parent company or group name. */
  readonly company: string;
  /** Known major shareholders or controlling entities. */
  readonly shareholders: readonly string[];
  /** Whether the outlet receives direct government/institutional funding. */
  readonly governmentFunding: boolean;
  /** Optional notes on funding structure. */
  readonly fundingNotes?: string;
}

/** Full media outlet entity as stored in a per-outlet JSON file. */
export interface MediaOutlet {
  /** Unique kebab-case identifier. Also used as filename. */
  readonly id: string;
  /** URL-friendly slug (usually equals id). */
  readonly slug: string;
  /** Official name of the media outlet. */
  readonly name: string;
  /** Path to the logo file relative to /public. */
  readonly logo: string;
  /** Primary website URL. */
  readonly website: string;
  /** Classification of the outlet. */
  readonly type: MediaType;
  /** Ownership and funding structure. */
  readonly ownership: OwnershipInfo;
  /** Chronologically ordered evaluations (newest first). */
  readonly evaluations: readonly Evaluation[];
}

/** Lightweight summary used in the index.json listing / ranking page. */
export interface MediaOutletSummary {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly logo: string;
  readonly type: MediaType;
  /** Latest reliability score (0–10). */
  readonly reliabilityScore: number;
  /** Latest reliability grade. */
  readonly reliabilityGrade: string;
  /** Latest neutrality score (0–10). */
  readonly neutralityScore: number;
  /** Latest neutrality grade. */
  readonly neutralityGrade: string;
  /** Latest overall score (0–10). */
  readonly overallScore: number;
  /** Latest overall grade. */
  readonly overallGrade: string;
  /** ISO date of the latest evaluation. */
  readonly lastEvaluationDate: string;
}
