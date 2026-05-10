"use client";

import type { DimensionScore } from "@/domain/entities/evaluation";

interface ScoreRadarProps {
  readonly reliability: DimensionScore;
  readonly neutrality: DimensionScore;
  readonly categoryLabels: Record<string, string>;
}

const RADAR_SIZE = 280;
const CENTER = RADAR_SIZE / 2;
const RADIUS = 110;

/**
 * SVG-based radar chart showing category scores for both dimensions.
 * No external chart library needed — pure SVG for minimal bundle size.
 */
export function ScoreRadar({ reliability, neutrality, categoryLabels }: ScoreRadarProps) {
  const allCategories = [
    ...Object.entries(reliability.categories).map(([key, cat]) => ({
      key,
      label: categoryLabels[key] ?? key,
      score: cat.score,
      dimension: "reliability" as const,
    })),
    ...Object.entries(neutrality.categories).map(([key, cat]) => ({
      key,
      label: categoryLabels[key] ?? key,
      score: cat.score,
      dimension: "neutrality" as const,
    })),
  ];

  const angleStep = (2 * Math.PI) / allCategories.length;

  function polarToCartesian(index: number, value: number): { x: number; y: number } {
    const angle = angleStep * index - Math.PI / 2;
    const normalizedRadius = (value / 10) * RADIUS;
    return {
      x: CENTER + normalizedRadius * Math.cos(angle),
      y: CENTER + normalizedRadius * Math.sin(angle),
    };
  }

  function buildPolygon(categories: typeof allCategories): string {
    return categories
      .map((_, index) => {
        const { x, y } = polarToCartesian(index, categories[index].score);
        return `${x},${y}`;
      })
      .join(" ");
  }

  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
        className="h-64 w-64 md:h-72 md:w-72"
        role="img"
        aria-label="Score radar chart"
      >
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={CENTER}
            cy={CENTER}
            r={(level / 10) * RADIUS}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={level === 10 ? 1.5 : 0.5}
          />
        ))}

        {/* Axis lines */}
        {allCategories.map((_, index) => {
          const { x, y } = polarToCartesian(index, 10);
          return (
            <line
              key={`axis-${index}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Score polygon */}
        <polygon
          points={buildPolygon(allCategories)}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Score dots */}
        {allCategories.map((cat, index) => {
          const { x, y } = polarToCartesian(index, cat.score);
          return (
            <circle
              key={`dot-${cat.key}`}
              cx={x}
              cy={y}
              r={3}
              fill="#3b82f6"
              stroke="white"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Labels */}
        {allCategories.map((cat, index) => {
          const { x, y } = polarToCartesian(index, 12.5);
          const isRight = x > CENTER;
          const isBottom = y > CENTER;
          return (
            <text
              key={`label-${cat.key}`}
              x={x}
              y={y}
              textAnchor={Math.abs(x - CENTER) < 5 ? "middle" : isRight ? "start" : "end"}
              dominantBaseline={Math.abs(y - CENTER) < 5 ? "middle" : isBottom ? "hanging" : "auto"}
              className="fill-slate-500 text-[8px]"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
