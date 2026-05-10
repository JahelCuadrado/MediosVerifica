/**
 * Every individual criterion used to evaluate NEUTRALITY of a media outlet.
 * Grouped by category for UI rendering and weight calculation.
 *
 * v4 changelog (from v2/v3):
 * - Merged informationalSilences + spaceProportionality → coverageBalance
 * - Merged treatmentSymmetry + headlineVoiceDiversity → editorialSymmetry
 * - Merged frontPagePlacement + framing → narrativeFraming (with operational definition)
 * - Removed Visual Hierarchy category, merged into Selection & Framing
 * - Rationale: eliminates compound penalization for the same editorial bias
 */
export enum NeutralityCriterion {
  // ── A. Language & Narrative ──
  ADJECTIVE_LOAD = "adjectiveLoad",
  ATTRIBUTION_VERBS = "attributionVerbs",
  OPINION_LABELING = "opinionLabeling",

  // ── B. Selection & Framing (Agenda Setting) ──
  COVERAGE_BALANCE = "coverageBalance",
  EDITORIAL_SYMMETRY = "editorialSymmetry",
  NARRATIVE_FRAMING = "narrativeFraming",
  SURVEY_TREATMENT = "surveyTreatment",

  // ── C. Visual Representation ──
  PHOTO_SELECTION = "photoSelection",

  // ── D. Interests & Funding ──
  OWNERSHIP_TRANSPARENCY = "ownershipTransparency",
  INSTITUTIONAL_ADVERTISING = "institutionalAdvertising",
  CONFLICT_OF_INTEREST = "conflictOfInterest",
}

/**
 * Categories that group neutrality criteria together.
 * Each category receives a weight in the final score calculation.
 */
export enum NeutralityCategory {
  LANGUAGE_NARRATIVE = "languageNarrative",
  SELECTION_FRAMING = "selectionFraming",
  VISUAL_REPRESENTATION = "visualRepresentation",
  INTERESTS_FUNDING = "interestsFunding",
}

/** Maps each criterion to its parent category. */
export const NEUTRALITY_CRITERION_CATEGORY: Record<NeutralityCriterion, NeutralityCategory> = {
  [NeutralityCriterion.ADJECTIVE_LOAD]: NeutralityCategory.LANGUAGE_NARRATIVE,
  [NeutralityCriterion.ATTRIBUTION_VERBS]: NeutralityCategory.LANGUAGE_NARRATIVE,
  [NeutralityCriterion.OPINION_LABELING]: NeutralityCategory.LANGUAGE_NARRATIVE,

  [NeutralityCriterion.COVERAGE_BALANCE]: NeutralityCategory.SELECTION_FRAMING,
  [NeutralityCriterion.EDITORIAL_SYMMETRY]: NeutralityCategory.SELECTION_FRAMING,
  [NeutralityCriterion.NARRATIVE_FRAMING]: NeutralityCategory.SELECTION_FRAMING,
  [NeutralityCriterion.SURVEY_TREATMENT]: NeutralityCategory.SELECTION_FRAMING,

  [NeutralityCriterion.PHOTO_SELECTION]: NeutralityCategory.VISUAL_REPRESENTATION,

  [NeutralityCriterion.OWNERSHIP_TRANSPARENCY]: NeutralityCategory.INTERESTS_FUNDING,
  [NeutralityCriterion.INSTITUTIONAL_ADVERTISING]: NeutralityCategory.INTERESTS_FUNDING,
  [NeutralityCriterion.CONFLICT_OF_INTEREST]: NeutralityCategory.INTERESTS_FUNDING,
};

/** Criteria list per category, for iteration convenience. */
export const NEUTRALITY_CRITERIA_BY_CATEGORY: Record<NeutralityCategory, readonly NeutralityCriterion[]> = {
  [NeutralityCategory.LANGUAGE_NARRATIVE]: [
    NeutralityCriterion.ADJECTIVE_LOAD,
    NeutralityCriterion.ATTRIBUTION_VERBS,
    NeutralityCriterion.OPINION_LABELING,
  ],
  [NeutralityCategory.SELECTION_FRAMING]: [
    NeutralityCriterion.COVERAGE_BALANCE,
    NeutralityCriterion.EDITORIAL_SYMMETRY,
    NeutralityCriterion.NARRATIVE_FRAMING,
    NeutralityCriterion.SURVEY_TREATMENT,
  ],
  [NeutralityCategory.VISUAL_REPRESENTATION]: [
    NeutralityCriterion.PHOTO_SELECTION,
  ],
  [NeutralityCategory.INTERESTS_FUNDING]: [
    NeutralityCriterion.OWNERSHIP_TRANSPARENCY,
    NeutralityCriterion.INSTITUTIONAL_ADVERTISING,
    NeutralityCriterion.CONFLICT_OF_INTEREST,
  ],
};
