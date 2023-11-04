import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import router from "@/router";
// import { App } from "@vue/runtime-core";
import { App } from "vue";

const appUrl = process.env.VITE_APP_URL as string;
export const sentryInit = (app: App) => {
  if (process.env.VITE_USER_NODE_ENV != "local") {
    Sentry.init({
      app,
      dsn: process.env.VITE_SENTRY_DSN as string,
      release: "Starter@" + process.env.VITE_APP_VERSION,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ["localhost", appUrl, /^\//],
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV as string,
    });
  }
};
