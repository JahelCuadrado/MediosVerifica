import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { loadMediaIndex } from "@/infrastructure/data-loader";
import { Button } from "@/presentation/components/ui/button";
import { MediaCard } from "@/presentation/components/media/media-card";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMedia = loadMediaIndex();
  const featured = [...allMedia]
    .sort((a, b) => new Date(b.lastEvaluationDate).getTime() - new Date(a.lastEvaluationDate).getTime())
    .slice(0, 6);

  return <HomeContent locale={locale} featured={featured} />;
}

function HomeContent({
  locale,
  featured,
}: {
  locale: string;
  featured: ReturnType<typeof loadMediaIndex> extends readonly (infer T)[] ? T[] : never;
}) {
  const t = useTranslations("home");
  const tDetail = useTranslations("detail");
  const tCommon = useTranslations("common");

  const totalMedia = featured.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${locale}/medios`}>
                <Button size="lg">{t("hero.ctaExplore")}</Button>
              </Link>
              <Link href={`/${locale}/metodologia`}>
                <Button variant="secondary" size="lg">
                  {t("hero.ctaMethodology")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient orb */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 py-12 text-center sm:grid-cols-3 sm:px-6">
          <div>
            <p className="text-3xl font-bold text-slate-900">{totalMedia}+</p>
            <p className="mt-1 text-sm text-slate-500">{t("stats.mediaEvaluated")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">25</p>
            <p className="mt-1 text-sm text-slate-500">{t("stats.criteriaAnalyzed")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">100%</p>
            <p className="mt-1 text-sm text-slate-500">{t("stats.evidenceLinks")}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900">
            {t("howItWorks.title")}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {(["step1", "step2", "step3"] as const).map((step, index) => (
              <div key={step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {t(`howItWorks.${step}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {t(`howItWorks.${step}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured evaluations */}
      {featured.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                {t("featured.title")}
              </h2>
              <Link
                href={`/${locale}/medios`}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {t("featured.viewAll")} →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((outlet) => (
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
          </div>
        </section>
      )}
    </>
  );
}
