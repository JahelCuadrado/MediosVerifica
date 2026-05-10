"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { MediaOutletSummary } from "@/domain/entities/media-outlet";
import { MediaCard } from "@/presentation/components/media/media-card";

type SortKey = "overallScore" | "reliabilityScore" | "neutralityScore" | "name";
type MediaFilter = "all" | MediaOutletSummary["type"];

interface MediaListClientProps {
  readonly outlets: readonly MediaOutletSummary[];
  readonly locale: string;
}

export function MediaListClient({ outlets, locale }: MediaListClientProps) {
  const t = useTranslations("media");
  const tDetail = useTranslations("detail");
  const tCommon = useTranslations("common");

  const [filter, setFilter] = useState<MediaFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("overallScore");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...outlets];

    if (filter !== "all") {
      result = result.filter((o) => o.type === filter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((o) => o.name.toLowerCase().includes(query));
    }

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b[sortBy] as number) - (a[sortBy] as number);
    });

    return result;
  }, [outlets, filter, sortBy, searchQuery]);

  const FILTER_OPTIONS: { key: MediaFilter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "newspaper", label: t("filterNewspaper") },
    { key: "television", label: t("filterTelevision") },
    { key: "radio", label: t("filterRadio") },
    { key: "digital-native", label: t("filterDigitalNative") },
    { key: "news-agency", label: t("filterNewsAgency") },
    { key: "magazine", label: t("filterMagazine") },
  ];

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: "overallScore", label: t("sortByOverall") },
    { key: "reliabilityScore", label: t("sortByReliability") },
    { key: "neutralityScore", label: t("sortByNeutrality") },
    { key: "name", label: t("sortByName") },
  ];

  return (
    <div>
      {/* Search + Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("filterAll")}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 sm:max-w-xs"
        />

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Type filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === opt.key
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">{t("noResults")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((outlet) => (
              <MediaCard
                key={outlet.id}
                outlet={outlet}
                locale={locale}
                reliabilityLabel={tDetail("reliability")}
                neutralityLabel={tDetail("neutrality")}
                overallLabel={tDetail("overall")}
                viewDetailsLabel={tCommon("viewDetails")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
