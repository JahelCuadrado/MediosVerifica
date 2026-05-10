import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { loadMediaIndex } from "@/infrastructure/data-loader";
import { MediaListClient } from "./media-list-client";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const outlets = loadMediaIndex();

  return <MediaPageContent locale={locale} outlets={outlets} />;
}

function MediaPageContent({
  locale,
  outlets,
}: {
  locale: string;
  outlets: ReturnType<typeof loadMediaIndex>;
}) {
  const t = useTranslations("media");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-lg text-slate-500">{t("subtitle")}</p>
      </div>

      <MediaListClient outlets={outlets} locale={locale} />
    </div>
  );
}
