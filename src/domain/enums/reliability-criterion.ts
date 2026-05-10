/**
 * Every individual criterion used to evaluate RELIABILITY of a media outlet.
 * Grouped by category for UI rendering and weight calculation.
 *
 * v4 changelog (from v2/v3):
 * - Merged correctionTransparency + erratumVisibility → correctionsPolicy (v2)
 * - Replaced debunkHistory → verifiedErrorRatio (ratio per volume, not raw count) (v2)
 * - Added rawDataAccess (Source Rigor) (v2)
 * - Added proactiveRectification (Error Management) (v2)
 * - Replaced accreditations → editorialAccountability (v4, was readersOmbudsman)
 * - Added editorialAdSeparation (Outlet Identity) (v2)
 * - Added aiDisclosure (Outlet Identity) (v4)
 * - Renamed readersOmbudsman → editorialAccountability (v4)
 *   Rationale: only El País has a formal ombudsman in Spain; the criterion now
 *   accepts equivalent accountability mechanisms (subscriber channels, editorial
 *   boards, public editorial explanations) for parity across outlets.
 */
export enum ReliabilityCriterion {
  // ── A. Source Rigor ──
  SOURCE_IDENTIFIABILITY = "sourceIdentifiability",
  SOURCE_DIVERSITY = "sourceDiversity",
  DIRECT_LINKING = "directLinking",
  ATTACHED_DOCUMENTATION = "attachedDocumentation",
  RAW_DATA_ACCESS = "rawDataAccess",

  // ── B. Error Management ──
  CORRECTIONS_POLICY = "correctionsPolicy",
  VERIFIED_ERROR_RATIO = "verifiedErrorRatio",
  PROACTIVE_RECTIFICATION = "proactiveRectification",

  // ── C. Information Quality ──
  HEADLINE_BODY_CONSISTENCY = "headlineBodyConsistency",
  UPDATE_TIMESTAMP = "updateTimestamp",
  MULTIMEDIA_ACCURACY = "multimediaAccuracy",
  EXPERT_RELEVANCE = "expertRelevance",

  // ── D. Outlet Identity ──
  AUTHORSHIP = "authorship",
  EDITORIAL_ACCOUNTABILITY = "editorialAccountability",
  EDITORIAL_AD_SEPARATION = "editorialAdSeparation",
  AI_DISCLOSURE = "aiDisclosure",
}

/**
 * Categories that group reliability criteria together.
 * Each category receives a weight in the final score calculation.
 */
export enum ReliabilityCategory {
  SOURCE_RIGOR = "sourceRigor",
  ERROR_MANAGEMENT = "errorManagement",
  INFORMATION_QUALITY = "informationQuality",
  OUTLET_IDENTITY = "outletIdentity",
}

/** Maps each criterion to its parent category. */
export const RELIABILITY_CRITERION_CATEGORY: Record<ReliabilityCriterion, ReliabilityCategory> = {
  [ReliabilityCriterion.SOURCE_IDENTIFIABILITY]: ReliabilityCategory.SOURCE_RIGOR,
  [ReliabilityCriterion.SOURCE_DIVERSITY]: ReliabilityCategory.SOURCE_RIGOR,
  [ReliabilityCriterion.DIRECT_LINKING]: ReliabilityCategory.SOURCE_RIGOR,
  [ReliabilityCriterion.ATTACHED_DOCUMENTATION]: ReliabilityCategory.SOURCE_RIGOR,
  [ReliabilityCriterion.RAW_DATA_ACCESS]: ReliabilityCategory.SOURCE_RIGOR,

  [ReliabilityCriterion.CORRECTIONS_POLICY]: ReliabilityCategory.ERROR_MANAGEMENT,
  [ReliabilityCriterion.VERIFIED_ERROR_RATIO]: ReliabilityCategory.ERROR_MANAGEMENT,
  [ReliabilityCriterion.PROACTIVE_RECTIFICATION]: ReliabilityCategory.ERROR_MANAGEMENT,

  [ReliabilityCriterion.HEADLINE_BODY_CONSISTENCY]: ReliabilityCategory.INFORMATION_QUALITY,
  [ReliabilityCriterion.UPDATE_TIMESTAMP]: ReliabilityCategory.INFORMATION_QUALITY,
  [ReliabilityCriterion.MULTIMEDIA_ACCURACY]: ReliabilityCategory.INFORMATION_QUALITY,
  [ReliabilityCriterion.EXPERT_RELEVANCE]: ReliabilityCategory.INFORMATION_QUALITY,

  [ReliabilityCriterion.AUTHORSHIP]: ReliabilityCategory.OUTLET_IDENTITY,
  [ReliabilityCriterion.EDITORIAL_ACCOUNTABILITY]: ReliabilityCategory.OUTLET_IDENTITY,
  [ReliabilityCriterion.EDITORIAL_AD_SEPARATION]: ReliabilityCategory.OUTLET_IDENTITY,
  [ReliabilityCriterion.AI_DISCLOSURE]: ReliabilityCategory.OUTLET_IDENTITY,
};

/** Criteria list per category, for iteration convenience. */
export const RELIABILITY_CRITERIA_BY_CATEGORY: Record<ReliabilityCategory, readonly ReliabilityCriterion[]> = {
  [ReliabilityCategory.SOURCE_RIGOR]: [
    ReliabilityCriterion.SOURCE_IDENTIFIABILITY,
    ReliabilityCriterion.SOURCE_DIVERSITY,
    ReliabilityCriterion.DIRECT_LINKING,
    ReliabilityCriterion.ATTACHED_DOCUMENTATION,
    ReliabilityCriterion.RAW_DATA_ACCESS,
  ],
  [ReliabilityCategory.ERROR_MANAGEMENT]: [
    ReliabilityCriterion.CORRECTIONS_POLICY,
    ReliabilityCriterion.VERIFIED_ERROR_RATIO,
    ReliabilityCriterion.PROACTIVE_RECTIFICATION,
  ],
  [ReliabilityCategory.INFORMATION_QUALITY]: [
    ReliabilityCriterion.HEADLINE_BODY_CONSISTENCY,
    ReliabilityCriterion.UPDATE_TIMESTAMP,
    ReliabilityCriterion.MULTIMEDIA_ACCURACY,
    ReliabilityCriterion.EXPERT_RELEVANCE,
  ],
  [ReliabilityCategory.OUTLET_IDENTITY]: [
    ReliabilityCriterion.AUTHORSHIP,
    ReliabilityCriterion.EDITORIAL_ACCOUNTABILITY,
    ReliabilityCriterion.EDITORIAL_AD_SEPARATION,
    ReliabilityCriterion.AI_DISCLOSURE,
  ],
};
