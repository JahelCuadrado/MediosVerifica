import { cn } from "@/presentation/lib/utils";
import { GRADE_COLORS } from "@/presentation/lib/constants";

interface GradeBadgeProps {
  readonly grade: string;
  readonly size?: "sm" | "md" | "lg";
  readonly label?: string;
}

const BADGE_SIZES = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-lg",
} as const;

export function GradeBadge({ grade, size = "md", label }: GradeBadgeProps) {
  const colors = GRADE_COLORS[grade] ?? GRADE_COLORS["C"];

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-lg border font-bold",
          colors.background,
          colors.text,
          colors.border,
          BADGE_SIZES[size],
        )}
        aria-label={`Grade ${grade}`}
      >
        {grade}
      </div>
      {label && (
        <span className="text-sm text-slate-500">{label}</span>
      )}
    </div>
  );
}
