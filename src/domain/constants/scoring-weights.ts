import type { ReliabilityCategory } from "../enums/reliability-criterion";
import type { NeutralityCategory } from "../enums/neutrality-criterion";

/**
 * Scoring weight configuration for the transversal weighting system (v4).
 *
 * v4 changes:
 *  - Reliability outletIdentity increased from 0.15 → 0.20 (now has 4 criteria incl. aiDisclosure)
 *  - Reliability sourceRigor decreased from 0.35 → 0.30 (rebalance)
 *  - Neutrality categories restructured: selectionFraming 0.30, visualRepresentation 0.10
 *  - Global weights remain 60/40 (reliability/neutrality)
 */

/** Weights for each reliability category. Must sum to 1.0. */
export const RELIABILITY_WEIGHTS: Record<ReliabilityCategory, number> = {
  sourceRigor: 0.30,
  errorManagement: 0.25,
  informationQuality: 0.25,
  outletIdentity: 0.20,
} as const;

/** Weights for each neutrality category. Must sum to 1.0. */
export const NEUTRALITY_WEIGHTS: Record<NeutralityCategory, number> = {
  languageNarrative: 0.30,
  selectionFraming: 0.30,
  visualRepresentation: 0.10,
  interestsFunding: 0.30,
} as const;

/**
 * Weights for the global composite score.
 * The final "overall" grade blends reliability and neutrality.
 *
 * Rationale (unchanged from v2): A media outlet can be editorially biased but
 * factually rigorous, and that is fundamentally different from one that fabricates
 * or distorts facts. 60/40 better reflects the hierarchy of journalistic sins.
 */
export const GLOBAL_DIMENSION_WEIGHTS = {
  reliability: 0.60,
  neutrality: 0.40,
} as const;

/** Score boundaries (inclusive). */
export const SCORE_MIN = 0;
export const SCORE_MAX = 10;
