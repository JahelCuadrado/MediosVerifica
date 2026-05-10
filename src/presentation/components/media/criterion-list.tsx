import type { DimensionScore } from "@/domain/entities/evaluation";
import type { SupportedLocale } from "@/domain/entities/evaluation";
import { deriveGrade } from "@/application/scoring.service";
import { ScoreBar } from "../ui/score-bar";
import { GradeBadge } from "../ui/grade-badge";

interface CriterionListProps {
  readonly dimension: DimensionScore;
  readonly locale: SupportedLocale;
  readonly categoryLabels: Record<string, string>;
  readonly criterionLabels: Record<string, string>;
  readonly justificationLabel: string;
  readonly evidenceLabel: string;
}

export function CriterionList({
  dimension,
  locale,
  categoryLabels,
  criterionLabels,
  justificationLabel,
  evidenceLabel,
}: CriterionListProps) {
  return (
    <div className="space-y-8">
      {Object.entries(dimension.categories).map(([categoryKey, category]) => (
        <div key={categoryKey}>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">
              {categoryLabels[categoryKey] ?? categoryKey}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {(category.weight * 100).toFixed(0)}%
              </span>
              <GradeBadge
                grade={deriveGrade(category.score)}
                size="sm"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            {Object.entries(category.criteria).map(([criterionKey, criterion]) => (
              <div key={criterionKey} className="space-y-2">
                <ScoreBar
                  score={criterion.score}
                  label={criterionLabels[criterionKey] ?? criterionKey}
                />

                <div className="ml-[132px] space-y-1">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-600">{justificationLabel}: </span>
                    {criterion.justification[locale]}
                  </p>

                  {criterion.evidence.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium text-slate-600">{evidenceLabel}: </span>
                      {criterion.evidence.map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
                        >
                          {new URL(url).hostname}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
