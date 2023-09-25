import { createI18n } from "vue-i18n";
import translationsService from "@/services/translationsService.ts";

import en from "@/assets/locales/en.json";
import it from "@/assets/locales/it.json";
import es from "@/assets/locales/es.json";

const messages = { en, it, es };

const i18n = createI18n({
  legacy: false,
  locale: translationsService.getLocaleFromBrowser(),
  fallbackLocale: "en",
  messages,
  silentFallbackWarn: false,
});

export default i18n;
export const t = i18n.global.t;
