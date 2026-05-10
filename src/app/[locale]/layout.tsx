import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { inter, newsreader } from "@/presentation/lib/fonts";
import { Header } from "@/presentation/components/layout/header";
import { Footer } from "@/presentation/components/layout/footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    metadataBase: new URL("https://mediosverifica.me"),
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const navigation = (messages as Record<string, Record<string, string>>).navigation;
  const footer = (messages as Record<string, Record<string, string>>).footer;

  return (
    <html lang={locale} className={`${inter.variable} ${newsreader.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-slate-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} navigation={navigation as { home: string; media: string; methodology: string; about: string }} />
          <main className="flex-1">{children}</main>
          <Footer
            locale={locale}
            texts={footer as { description: string; data: string; apiDescription: string; license: string }}
            navigation={navigation as { media: string; methodology: string; about: string }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
