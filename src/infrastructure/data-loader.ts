import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { MediaOutlet, MediaOutletSummary } from "../domain/entities/media-outlet";
import type { Evaluation, CategoryScore, DimensionScore } from "../domain/entities/evaluation";
import { deriveGrade, computeCategoryScore, computeOverallScore, buildDimensionScore } from "../application/scoring.service";
import { RELIABILITY_WEIGHTS, NEUTRALITY_WEIGHTS } from "../domain/constants/scoring-weights";

const DATA_DIR = join(process.cwd(), "api", "data");

/**
 * Raw JSON shape before scores are recomputed.
 * Category scores, dimension scores/grades and overall values
 * are treated as untrusted — they are recalculated at load time.
 */
interface RawEvaluation {
  readonly version: string;
  readonly date: string;
  readonly evaluator: string;
  readonly reliability: { readonly categories: Record<string, CategoryScore> };
  readonly neutrality: { readonly categories: Record<string, CategoryScore> };
}

/**
 * Recomputes all derived scores and grades for a single evaluation
 * from the raw criterion-level data.
 */
function recomputeEvaluation(raw: RawEvaluation): Evaluation {
  const reliabilityCategories = recomputeCategories(raw.reliability.categories);
  const neutralityCategories = recomputeCategories(raw.neutrality.categories);

  const reliability: DimensionScore = buildDimensionScore(reliabilityCategories, RELIABILITY_WEIGHTS);
  const neutrality: DimensionScore = buildDimensionScore(neutralityCategories, NEUTRALITY_WEIGHTS);

  const overallScore = computeOverallScore(reliability.score, neutrality.score);

  return {
    version: raw.version,
    date: raw.date,
    evaluator: raw.evaluator,
    reliability,
    neutrality,
    overallScore,
    overallGrade: deriveGrade(overallScore),
  };
}

/**
 * Recomputes the average score for each category from its criteria.
 * Ignores the pre-baked `score` and `weight` fields in the JSON.
 */
function recomputeCategories(
  categories: Record<string, CategoryScore>,
): Record<string, CategoryScore> {
  const result: Record<string, CategoryScore> = {};

  for (const [key, category] of Object.entries(categories)) {
    const score = computeCategoryScore(category.criteria);
    result[key] = {
      weight: category.weight,
      score,
      criteria: category.criteria,
    };
  }

  return result;
}

/**
 * Reads a single media outlet JSON by slug and recomputes all scores.
 * Used at build time for individual outlet pages.
 */
export function loadMediaOutlet(slug: string): MediaOutlet {
  const safeName = slug.replace(/[^a-z0-9-]/g, "");
  const filePath = join(DATA_DIR, "media", `${safeName}.json`);
  const raw = JSON.parse(readFileSync(filePath, "utf-8"));

  const evaluations: Evaluation[] = (raw.evaluations as RawEvaluation[]).map(recomputeEvaluation);

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    logo: raw.logo,
    website: raw.website,
    type: raw.type,
    ownership: raw.ownership,
    evaluations,
  };
}

/**
 * Generates the summary listing dynamically from individual media JSONs.
 * Replaces the static index.json — scores are always freshly computed.
 * Used at build time for the ranking / listing page.
 */
export function loadMediaIndex(): readonly MediaOutletSummary[] {
  const slugs = listMediaSlugs();

  return slugs.map((slug) => {
    const outlet = loadMediaOutlet(slug);
    const latest = outlet.evaluations[0];

    return {
      id: outlet.id,
      slug: outlet.slug,
      name: outlet.name,
      logo: outlet.logo,
      type: outlet.type,
      reliabilityScore: latest?.reliability.score ?? 0,
      reliabilityGrade: latest?.reliability.grade ?? "E",
      neutralityScore: latest?.neutrality.score ?? 0,
      neutralityGrade: latest?.neutrality.grade ?? "E",
      overallScore: latest?.overallScore ?? 0,
      overallGrade: latest?.overallGrade ?? "E",
      lastEvaluationDate: latest?.date ?? "",
    };
  });
}

/**
 * Returns all available media outlet slugs.
 * Used by generateStaticParams() for SSG.
 */
export function listMediaSlugs(): readonly string[] {
  const mediaDir = join(DATA_DIR, "media");
  return readdirSync(mediaDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}
