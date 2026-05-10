import { Grade, GRADE_THRESHOLDS } from "../domain/enums/grade";
import { RELIABILITY_WEIGHTS, NEUTRALITY_WEIGHTS, GLOBAL_DIMENSION_WEIGHTS } from "../domain/constants/scoring-weights";
import type { CategoryScore, DimensionScore, CriterionScore } from "../domain/entities/evaluation";
import type { ReliabilityCategory } from "../domain/enums/reliability-criterion";
import type { NeutralityCategory } from "../domain/enums/neutrality-criterion";

/**
 * Derives a letter grade from a numeric score (0–10).
 * Uses the threshold table from the domain layer.
 */
export function deriveGrade(score: number): Grade {
  for (const { min, grade } of GRADE_THRESHOLDS) {
    if (score >= min) {
      return grade;
    }
  }
  return Grade.E;
}

/**
 * Computes the average score from a record of criterion scores.
 * Uses arithmetic mean (each criterion within a category has equal weight).
 */
export function computeCategoryScore(criteria: Record<string, CriterionScore>): number {
  const values = Object.values(criteria);
  if (values.length === 0) return 0;

  const sum = values.reduce((acc, criterion) => acc + criterion.score, 0);
  return Math.round((sum / values.length) * 100) / 100;
}

/**
 * Computes the weighted score for a full dimension (reliability or neutrality).
 * Each category's average score is multiplied by its weight.
 */
export function computeDimensionScore(
  categories: Record<string, CategoryScore>,
  weights: Record<string, number>,
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [categoryKey, categoryScore] of Object.entries(categories)) {
    const weight = weights[categoryKey] ?? 0;
    weightedSum += categoryScore.score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

/**
 * Builds a complete DimensionScore from raw category data.
 */
export function buildDimensionScore(
  categories: Record<string, CategoryScore>,
  weights: Record<string, number>,
): DimensionScore {
  const score = computeDimensionScore(categories, weights);
  return {
    score,
    grade: deriveGrade(score),
    categories,
  };
}

/**
 * Computes the overall blended score from reliability and neutrality scores.
 */
export function computeOverallScore(
  reliabilityScore: number,
  neutralityScore: number,
): number {
  const blended =
    reliabilityScore * GLOBAL_DIMENSION_WEIGHTS.reliability +
    neutralityScore * GLOBAL_DIMENSION_WEIGHTS.neutrality;
  return Math.round(blended * 100) / 100;
}

/**
 * Computes a reliability dimension score using the reliability weight table.
 */
export function computeReliabilityDimension(
  categories: Record<ReliabilityCategory, CategoryScore>,
): DimensionScore {
  return buildDimensionScore(categories, RELIABILITY_WEIGHTS);
}

/**
 * Computes a neutrality dimension score using the neutrality weight table.
 */
export function computeNeutralityDimension(
  categories: Record<NeutralityCategory, CategoryScore>,
): DimensionScore {
  return buildDimensionScore(categories, NEUTRALITY_WEIGHTS);
}
