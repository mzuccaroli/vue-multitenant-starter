import { createI18n } from "vue-i18n";
import translationsService from "@/services/translationsService.ts";

import en from "@/assets/locales/default.json";

const messages = { en };

const i18n = createI18n({
  legacy: false,
  locale: translationsService.getLocaleFromBrowser(),
  fallbackLocale: "en",
  messages,
  silentFallbackWarn: false,
});

export default i18n;
export const t = i18n.global.t;
