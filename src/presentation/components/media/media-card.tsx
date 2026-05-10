import Link from "next/link";
import Image from "next/image";
import type { MediaOutletSummary } from "@/domain/entities/media-outlet";
import { Card } from "../ui/card";
import { GradeBadge } from "../ui/grade-badge";
import { ScoreBar } from "../ui/score-bar";

interface MediaCardProps {
  readonly outlet: MediaOutletSummary;
  readonly locale: string;
  readonly reliabilityLabel: string;
  readonly neutralityLabel: string;
  readonly overallLabel: string;
  readonly viewDetailsLabel: string;
}

export function MediaCard({
  outlet,
  locale,
  reliabilityLabel,
  neutralityLabel,
  overallLabel,
  viewDetailsLabel,
}: MediaCardProps) {
  return (
    <Link href={`/${locale}/medios/${outlet.slug}`} className="block">
      <Card hoverable className="group relative">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
            <Image
              src={outlet.logo}
              alt={`Logo de ${outlet.name}`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-slate-700">
                {outlet.name}
              </h3>
              <GradeBadge grade={outlet.overallGrade} size="sm" />
            </div>

            <div className="mt-3 space-y-2">
              <ScoreBar score={outlet.reliabilityScore} label={reliabilityLabel} />
              <ScoreBar score={outlet.neutralityScore} label={neutralityLabel} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">{overallLabel}</span>
                <span className="text-sm font-bold text-slate-700">
                  {outlet.overallScore.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-slate-400 transition-colors group-hover:text-slate-600">
                {viewDetailsLabel} →
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
