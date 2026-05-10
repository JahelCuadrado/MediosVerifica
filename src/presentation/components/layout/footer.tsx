import Link from "next/link";

interface FooterProps {
  readonly locale: string;
  readonly texts: {
    description: string;
    data: string;
    apiDescription: string;
    license: string;
  };
  readonly navigation: {
    media: string;
    methodology: string;
    about: string;
  };
}

export function Footer({ locale, texts, navigation }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
                MV
              </span>
              MediosVerifica
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {texts.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`/${locale}/medios`}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {navigation.media}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/metodologia`}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {navigation.methodology}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/sobre`}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {navigation.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{texts.data}</h3>
            <p className="mt-3 text-sm text-slate-500">{texts.apiDescription}</p>
            <p className="mt-2 text-xs text-slate-400">{texts.license}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} MediosVerifica.me
        </div>
      </div>
    </footer>
  );
}
