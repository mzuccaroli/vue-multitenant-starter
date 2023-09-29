import { LocaleMessageObject } from "vue-i18n";
import * as tenantService from "@/services/tenantService.ts";

export const getLocaleFromBrowser = (): string => {
  const loc = navigator.language || "en-EN";
  return loc.split("-")[0];
};

export const getTranslation = async (
  lang: string
): Promise<LocaleMessageObject> => {
  return getFromFs(lang);
  // return getFromCMS(lang);
};

const getFromFs = async (lang: string): Promise<LocaleMessageObject> => {
  // this should be validated
  return await tenantService.getLocaleAsset(lang);
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
