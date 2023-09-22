import { LocaleMessageObject } from "vue-i18n";
import tenantService from "@/services/tenantService.ts";

export default {
  getLocaleFromBrowser(): string {
    const loc = navigator.language || "en-EN";
    return loc.split("-")[0];
  },

  async getTranslation(lang: string): Promise<LocaleMessageObject> {
    return getFromFs(lang);
    // return getFromCMS(lang);
  },
};

const getFromFs = async (lang: string): Promise<LocaleMessageObject> => {
  const messages = await tenantService.getLocaleAsset(lang);
  //this should be validated
  return messages.default as LocaleMessageObject;
};

// const getFromCMS = async (lang: string): Promise<LocaleMessageObject> => {
//   const res = await contentfulApi.getEntries({
//     content_type: "jsonTranslation",
//     locale: lang,
//     "fields.tenant": tenantService.getTenantCode(),
//     "fields.product": "console",
//   });
//   return res.items[0].fields.translation as LocaleMessageObject;
// };
