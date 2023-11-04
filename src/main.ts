import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/styles/main.scss";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/plugins/i18n";
import { sentryInit } from "@/plugins/sentry.ts";
import * as translationsService from "@/services/translationsService.ts";
import loggerService from "@/services/loggerService.ts";
import axiosInterceptor from "@/plugins/axiosInterceptor";
import * as tenantService from "@/services/tenantService.ts";

const app = createApp(App);
const pinia = createPinia();
sentryInit(app);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");

axiosInterceptor();

// -------- tenant handling --------
try {
  const locale = i18n.global.locale.value;
  translationsService.getTranslation(locale).then((translations) => {
    i18n.global.mergeLocaleMessage(locale, translations);
  });
} catch (e) {
  loggerService.warn("Unable to retrieve tenant translations, using default");
}

try {
  tenantService.applyCss();
} catch (e) {
  loggerService.warn("Unable to load tenant css, skipping");
}
// -------- -------- --------
