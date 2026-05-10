import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  readonly locale: string;
  readonly navigation: {
    home: string;
    media: string;
    methodology: string;
    about: string;
  };
}

export function Header({ locale, navigation }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            MV
          </span>
          <span className="hidden sm:inline">MediosVerifica</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href={`/${locale}/medios`}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            {navigation.media}
          </Link>
          <Link
            href={`/${locale}/metodologia`}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            {navigation.methodology}
          </Link>
          <Link
            href={`/${locale}/sobre`}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-block"
          >
            {navigation.about}
          </Link>

          <div className="ml-2 border-l border-slate-200 pl-2">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
