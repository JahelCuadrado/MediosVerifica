import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-500">
        {t("subtitle")}
      </p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="font-serif text-xl font-bold text-slate-900">MediosVerifica.me</h2>
          <p className="mt-3">
            MediosVerifica es un proyecto independiente que evalúa la fiabilidad y neutralidad
            de los medios de comunicación españoles utilizando 25 criterios objetivos organizados
            en dos dimensiones: fiabilidad (¿dice la verdad?) y neutralidad (¿es equilibrado?).
          </p>
          <p className="mt-3">
            Cada evaluación está respaldada por evidencias documentadas y enlazadas, garantizando
            la transparencia total del proceso. Los datos son abiertos y accesibles vía API
            pública a través de jsDelivr.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-slate-900">Metodología</h2>
          <p className="mt-3">
            Nuestro sistema se inspira en proyectos como ToS;DR (Terms of Service; Didn&apos;t Read),
            adaptando su enfoque transparente y basado en criterios al ámbito del periodismo español.
            Cada medio recibe dos notas independientes (fiabilidad y neutralidad) que se combinan
            en una nota global.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-slate-900">Datos abiertos</h2>
          <p className="mt-3">
            Todos los datos de evaluación están disponibles en formato JSON a través de jsDelivr CDN.
            Puedes integrar nuestros datos en tus propias aplicaciones, extensiones de navegador o
            análisis académicos.
          </p>
          <code className="mt-2 block rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            https://cdn.jsdelivr.net/gh/[user]/MediosVerifica@main/api/data/index.json
          </code>
        </section>
      </div>
    </div>
  );
}
