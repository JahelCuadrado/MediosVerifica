import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadMediaOutlet, listMediaSlugs } from "@/infrastructure/data-loader";
import type { SupportedLocale } from "@/domain/entities/evaluation";
import { GradeBadge } from "@/presentation/components/ui/grade-badge";
import { ScoreBar } from "@/presentation/components/ui/score-bar";
import { Card } from "@/presentation/components/ui/card";
import { CriterionList } from "@/presentation/components/media/criterion-list";
import { ScoreRadar } from "@/presentation/components/media/score-radar";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  const slugs = listMediaSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let outlet;
  try {
    outlet = loadMediaOutlet(slug);
  } catch {
    notFound();
  }

  return <MediaDetailContent outlet={outlet} locale={locale as SupportedLocale} />;
}

function MediaDetailContent({
  outlet,
  locale,
}: {
  outlet: ReturnType<typeof loadMediaOutlet>;
  locale: SupportedLocale;
}) {
  const t = useTranslations("detail");
  const tCommon = useTranslations("common");
  const tGrades = useTranslations("grades");

  const latestEval = outlet.evaluations[0];
  if (!latestEval) return null;

  const categoryLabels: Record<string, string> = {
    sourceRigor: t("categories.sourceRigor"),
    errorManagement: t("categories.errorManagement"),
    informationQuality: t("categories.informationQuality"),
    outletIdentity: t("categories.outletIdentity"),
    languageNarrative: t("categories.languageNarrative"),
    selectionFraming: t("categories.selectionFraming"),
    visualRepresentation: t("categories.visualRepresentation"),
    interestsFunding: t("categories.interestsFunding"),
  };

  const criterionLabels: Record<string, string> = {
    sourceIdentifiability: t("criteria.sourceIdentifiability"),
    sourceDiversity: t("criteria.sourceDiversity"),
    directLinking: t("criteria.directLinking"),
    attachedDocumentation: t("criteria.attachedDocumentation"),
    rawDataAccess: t("criteria.rawDataAccess"),
    correctionsPolicy: t("criteria.correctionsPolicy"),
    verifiedErrorRatio: t("criteria.verifiedErrorRatio"),
    proactiveRectification: t("criteria.proactiveRectification"),
    headlineBodyConsistency: t("criteria.headlineBodyConsistency"),
    updateTimestamp: t("criteria.updateTimestamp"),
    multimediaAccuracy: t("criteria.multimediaAccuracy"),
    expertRelevance: t("criteria.expertRelevance"),
    authorship: t("criteria.authorship"),
    editorialAccountability: t("criteria.editorialAccountability"),
    editorialAdSeparation: t("criteria.editorialAdSeparation"),
    aiDisclosure: t("criteria.aiDisclosure"),
    adjectiveLoad: t("criteria.adjectiveLoad"),
    attributionVerbs: t("criteria.attributionVerbs"),
    opinionLabeling: t("criteria.opinionLabeling"),
    coverageBalance: t("criteria.coverageBalance"),
    editorialSymmetry: t("criteria.editorialSymmetry"),
    narrativeFraming: t("criteria.narrativeFraming"),
    surveyTreatment: t("criteria.surveyTreatment"),
    photoSelection: t("criteria.photoSelection"),
    ownershipTransparency: t("criteria.ownershipTransparency"),
    institutionalAdvertising: t("criteria.institutionalAdvertising"),
    conflictOfInterest: t("criteria.conflictOfInterest"),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Back link */}
      <Link
        href={`/${locale}/medios`}
        className="mb-6 inline-flex items-center text-sm text-slate-500 hover:text-slate-700"
      >
        ← {tCommon("backToList")}
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            <Image
              src={outlet.logo}
              alt={`Logo de ${outlet.name}`}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">{outlet.name}</h1>
            <a
              href={outlet.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-blue-500 hover:text-blue-700"
            >
              {outlet.website}
            </a>
          </div>
        </div>

        <GradeBadge
          grade={latestEval.overallGrade}
          size="lg"
          label={tGrades(latestEval.overallGrade as "A" | "B" | "C" | "D" | "E")}
        />
      </div>

      {/* Score overview */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {t("reliability")}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <GradeBadge grade={latestEval.reliability.grade} size="md" />
            <span className="text-2xl font-bold text-slate-900">
              {latestEval.reliability.score.toFixed(1)}
            </span>
          </div>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {t("neutrality")}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <GradeBadge grade={latestEval.neutrality.grade} size="md" />
            <span className="text-2xl font-bold text-slate-900">
              {latestEval.neutrality.score.toFixed(1)}
            </span>
          </div>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {t("overall")}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <GradeBadge grade={latestEval.overallGrade} size="md" />
            <span className="text-2xl font-bold text-slate-900">
              {latestEval.overallScore.toFixed(1)}
            </span>
          </div>
        </Card>
      </div>

      {/* Radar chart */}
      <Card className="mt-8">
        <ScoreRadar
          reliability={latestEval.reliability}
          neutrality={latestEval.neutrality}
          categoryLabels={categoryLabels}
        />
      </Card>

      {/* Ownership info */}
      <Card className="mt-8">
        <h2 className="font-serif text-xl font-bold text-slate-900">{t("ownership")}</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-2">
            <span className="min-w-[140px] text-sm font-medium text-slate-500">
              {t("ownership")}
            </span>
            <span className="text-sm text-slate-900">{outlet.ownership.company}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-[140px] text-sm font-medium text-slate-500">
              {t("shareholders")}
            </span>
            <span className="text-sm text-slate-900">
              {outlet.ownership.shareholders.join(", ")}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-[140px] text-sm font-medium text-slate-500">
              {t("governmentFunding")}
            </span>
            <span className="text-sm text-slate-900">
              {outlet.ownership.governmentFunding ? t("yes") : t("no")}
            </span>
          </div>
        </div>
      </Card>

      {/* Reliability detail */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-slate-900">{t("reliability")}</h2>
        <div className="mt-2 flex items-center gap-3">
          <GradeBadge grade={latestEval.reliability.grade} size="sm" />
          <ScoreBar score={latestEval.reliability.score} />
        </div>
        <div className="mt-6">
          <CriterionList
            dimension={latestEval.reliability}
            locale={locale}
            categoryLabels={categoryLabels}
            criterionLabels={criterionLabels}
            justificationLabel={t("justification")}
            evidenceLabel={t("evidence")}
          />
        </div>
      </div>

      {/* Neutrality detail */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-slate-900">{t("neutrality")}</h2>
        <div className="mt-2 flex items-center gap-3">
          <GradeBadge grade={latestEval.neutrality.grade} size="sm" />
          <ScoreBar score={latestEval.neutrality.score} />
        </div>
        <div className="mt-6">
          <CriterionList
            dimension={latestEval.neutrality}
            locale={locale}
            categoryLabels={categoryLabels}
            criterionLabels={criterionLabels}
            justificationLabel={t("justification")}
            evidenceLabel={t("evidence")}
          />
        </div>
      </div>

      {/* Evaluation history */}
      {outlet.evaluations.length > 1 && (
        <Card className="mt-12">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            {t("evaluationHistory")}
          </h2>
          <div className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs text-slate-400">
                  <th className="pb-2">{t("lastEvaluation")}</th>
                  <th className="pb-2">{t("reliability")}</th>
                  <th className="pb-2">{t("neutrality")}</th>
                  <th className="pb-2">{t("overall")}</th>
                </tr>
              </thead>
              <tbody>
                {outlet.evaluations.map((ev) => (
                  <tr key={ev.version} className="border-b border-slate-50">
                    <td className="py-2 text-slate-600">{ev.date}</td>
                    <td className="py-2">
                      <GradeBadge grade={ev.reliability.grade} size="sm" />
                    </td>
                    <td className="py-2">
                      <GradeBadge grade={ev.neutrality.grade} size="sm" />
                    </td>
                    <td className="py-2">
                      <GradeBadge grade={ev.overallGrade} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Meta */}
      <p className="mt-8 text-xs text-slate-400">
        {t("lastEvaluation")}: {latestEval.date} · v{latestEval.version}
      </p>
    </div>
  );
}
