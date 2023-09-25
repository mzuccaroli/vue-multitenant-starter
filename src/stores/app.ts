import { defineStore } from "pinia";
import tenantService from "@/services/tenantService.ts";
import translationsService from "@/services/translationsService.ts";
import i18n from "@/plugins/i18n.ts";
import loggerService from "@/services/loggerService.ts";

export interface AppState {
  productionMode: boolean;
  tenant: string;
  language: string;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    productionMode: process.env.VITE_RUNNING_CONTEXT === "production",
    tenant: tenantService.getTenant(),
    language: translationsService.getLocaleFromBrowser(),
  }),
  getters: {},
  actions: {
    async changeLanguage(lang: string) {
      this.language = lang;
      i18n.global.locale.value = lang;
      try {
        const translations = await translationsService.getTranslation(lang);
        i18n.global.mergeLocaleMessage(lang, translations);
      } catch (e) {
        loggerService.warn(
          `Unable to retrieve "${lang}" tenant translations`
        );
      }
    },
  },
});
