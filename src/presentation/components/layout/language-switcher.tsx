"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_NAMES } from "@/presentation/lib/constants";

interface LanguageSwitcherProps {
  readonly currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = event.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
      aria-label="Language"
    >
      {LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_NAMES[locale]}
        </option>
      ))}
    </select>
  );
}
