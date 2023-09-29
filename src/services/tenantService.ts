import loggerService from "@/services/loggerService.ts";

export const getTenant = (): string => {
  return process.env.VITE_TENANT || "Mago";
};
export const getSvgAssetUrl = async (asset: string) => {
  try {
    //import optimized with vite-svg-loader see https://www.npmjs.com/package/vite-svg-loader
    const svg = await import(
      `../assets/tenants/${process.env.VITE_TENANT}/img/${asset}.svg?url`
    );
    return svg.default;
  } catch (e) {
    loggerService.warn("Unable to retrieve tenant svg asset");
  }
};
export const getLogoAsset = (asset: string): string => {
  return new URL(`../assets/img/logos/${getTenant()}/${asset}`, import.meta.url)
    .href;
};

export const getLocaleAsset = async (lang: string) => {
  try {
    const res = await import(
      `../assets/tenants/${process.env.VITE_TENANT}/locales/${lang}.json`
    );
    return res.default;
  } catch (e) {
    loggerService.warn("Unable to retrieve tenant translations, using default");
  }
};

export const getCssAsset = async () => {
  try {
    //gob import see: https://vitejs.dev/guide/features.html#glob-import
    const styles = import.meta.glob("../assets/tenants/*/styles/stile.scss", {
      query: "?inline",
    });
    const res = await styles[
      `../assets/tenants/${process.env.VITE_TENANT}/styles/stile.scss`
    ]();
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    return (res as any).default;
  } catch (e) {
    loggerService.warn("Unable to load tenant css, skipping");
  }
};

export const applyCss = async () => {
  const css = await getCssAsset();
  if (css) {
    const styleElem = document.createElement("style");
    document.head.appendChild(styleElem);
  }
};
