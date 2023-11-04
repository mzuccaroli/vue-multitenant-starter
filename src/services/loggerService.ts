import * as Sentry from "@sentry/browser";
// import { useAuthStore } from "@/stores/auth";

const isDebugMode = process.env.VITE_DEBUG_MODE === "true";

/* eslint-disable no-console */
function log(data: string): void {
  if (isDebugMode) {
    console.log(data);
  }
}

function info(data: string): void {
  if (isDebugMode) {
    console.info(data);
  }
}

function warn(data: string | Error): void {
  // const authStore = useAuthStore();
  if (isDebugMode) {
    if (typeof data === "string") {
      data = {
        name: "Warning",
        message: data,
      };
    }
    // const user = authStore.user;
    Sentry.captureException(data, {
      // user: user,
    });
    console.warn(data.message);
  }
}

function error(data: string | Error | ErrorEvent | unknown): void {
  // const authStore = useAuthStore();
  if (typeof data === "string") {
    data = new Error(data);
  }
  // const user = authStore.user;
  Sentry.captureException(data, {
    // user: user,
  });
  console.error(data);
}

export default { log, info, warn, error };
