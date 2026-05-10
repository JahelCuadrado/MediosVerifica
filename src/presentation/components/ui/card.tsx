import type { HTMLAttributes } from "react";
import { cn } from "@/presentation/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        hoverable && "transition-shadow duration-200 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
