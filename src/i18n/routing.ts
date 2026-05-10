import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "ca", "eu", "gl"],
  defaultLocale: "es",
});
