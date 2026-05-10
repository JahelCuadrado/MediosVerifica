import { cn } from "@/presentation/lib/utils";
import { getScoreBarColor, getScoreColor } from "@/presentation/lib/constants";

interface ScoreBarProps {
  readonly score: number;
  readonly maxScore?: number;
  readonly label?: string;
  readonly showValue?: boolean;
}

export function ScoreBar({
  score,
  maxScore = 10,
  label,
  showValue = true,
}: ScoreBarProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="min-w-[120px] text-sm text-slate-600">{label}</span>
      )}
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getScoreBarColor(score))}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={maxScore}
        />
      </div>
      {showValue && (
        <span className={cn("min-w-[2rem] text-right text-sm font-semibold", getScoreColor(score))}>
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}
