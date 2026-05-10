import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Card } from "@/presentation/components/ui/card";
import { GradeBadge } from "@/presentation/components/ui/grade-badge";
import { RELIABILITY_WEIGHTS, NEUTRALITY_WEIGHTS } from "@/domain/constants/scoring-weights";

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MethodologyContent />;
}

function MethodologyContent() {
  const t = useTranslations("methodology");
  const tDetail = useTranslations("detail");

  const reliabilityCategories = Object.entries(RELIABILITY_WEIGHTS).map(([key, weight]) => ({
    key,
    label: tDetail(`categories.${key}` as Parameters<typeof tDetail>[0]),
    weight,
  }));

  const neutralityCategories = Object.entries(NEUTRALITY_WEIGHTS).map(([key, weight]) => ({
    key,
    label: tDetail(`categories.${key}` as Parameters<typeof tDetail>[0]),
    weight,
  }));

  const grades = [
    { grade: "A", description: t("gradeA") },
    { grade: "B", description: t("gradeB") },
    { grade: "C", description: t("gradeC") },
    { grade: "D", description: t("gradeD") },
    { grade: "E", description: t("gradeE") },
  ] as const;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-lg text-slate-500">{t("subtitle")}</p>

      {/* Grading system */}
      <Card className="mt-10">
        <h2 className="font-serif text-xl font-bold text-slate-900">{t("gradesTitle")}</h2>
        <div className="mt-6 space-y-4">
          {grades.map(({ grade, description }) => (
            <div key={grade} className="flex items-start gap-4">
              <GradeBadge grade={grade} size="md" />
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Reliability */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-slate-900">
          {t("reliabilityTitle")}
        </h2>
        <p className="mt-2 text-sm text-slate-500">{t("reliabilityDescription")}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reliabilityCategories.map(({ key, label, weight }) => (
            <Card key={key}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {(weight * 100).toFixed(0)}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Neutrality */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-slate-900">
          {t("neutralityTitle")}
        </h2>
        <p className="mt-2 text-sm text-slate-500">{t("neutralityDescription")}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {neutralityCategories.map(({ key, label, weight }) => (
            <Card key={key}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {(weight * 100).toFixed(0)}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weighting explanation */}
      <Card className="mt-12">
        <h2 className="font-serif text-xl font-bold text-slate-900">{t("weightsTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {t("weightsDescription")}
        </p>
        <div className="mt-4 text-xs text-slate-400">
          <p>Overall = (Reliability × 50%) + (Neutrality × 50%)</p>
          <p className="mt-1">Grade A ≥ 8.0 · B ≥ 6.0 · C ≥ 4.0 · D ≥ 2.0 · E {"<"} 2.0</p>
        </div>
      </Card>
    </div>
  );
}
