import "./globals.css";

/**
 * Root layout — minimal shell.
 * Actual locale-aware layout lives in [locale]/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
