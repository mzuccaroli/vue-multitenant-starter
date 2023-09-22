import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import type { ViteSentryPluginOptions } from "vite-plugin-sentry";
import viteSentry from "vite-plugin-sentry";

// https://vitejs.dev/config/

export default ({ mode }) => {
  // expose import.meta.env to classical process.env
  const env = loadEnv(mode, process.cwd());
  env.VITE_APP_VERSION = require("./package.json").version;
  env.VITE_APP_NAME = require("./package.json").name;
  env.VITE_APP_DESCRIPTION = require("./package.json").description;

  const sentryConfig: ViteSentryPluginOptions = {
    authToken: env.VITE_SENTRY_AUTH_TOKEN,
    org: env.VITE_SENTRY_ORGANIZATION,
    project: env.VITE_SENTRY_PROJECT,
    release: env.VITE_APP_VERSION,
    deploy: {
      env: mode,
    },
    setCommits: {
      auto: true,
    },
    debug: mode === "development",
    skipEnvironmentCheck: true,
    sourceMaps: {
      include: ["./dist/assets"],
      ignore: ["node_modules"],
      urlPrefix: "~/assets",
    },
  };

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );

  const faviconsInject =
    env.VITE_RUNNING_CONTEXT !== "local"
      ? vitePluginFaviconsInject(
          `./src/assets/tenants/${env.VITE_TENANT}/img/logo.svg`,
          {
            background: "#fff",
            theme_color: "#fff",
            appName: `${env.VITE_TENANT} | ${env.VITE_APP_NAME}`,
            appDescription: `${env.VITE_TENANT} ${env.VITE_APP_DESCRIPTION}`,
            version: env.VITE_APP_VERSION,
          }
        )
      : undefined;

  return defineConfig({
    // server: {
    //   port: 8080,
    // },
    plugins: [vue(), viteSentry(sentryConfig), faviconsInject],
    define: envWithProcessPrefix,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    test: {
      globals: true,
      environment: "jsdom",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*",
        "**/e2e/**",
      ],
      coverage: {
        reporter: ["text", "html"],
        exclude: ["node_modules/", "src/setupTests.ts"],
      },
    },
    // build: {
    //   rollupOptions: {
    //     // remove all assets that not belong to current tenant from final build
    //     external: new RegExp(`/assets/tenants/(?!${env.VITE_TENANT}/).*`),
    //   },
    // },
  });
};
