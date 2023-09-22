export default {
  getTenant(): string {
    return process.env.VITE_TENANT || "Mago";
  },
  async getSvgAssetUrl(asset: string) {
    //import optimized with vite-svg-loader see https://www.npmjs.com/package/vite-svg-loader
    const svg = await import(
      `../assets/tenants/${process.env.VITE_TENANT}/img/${asset}.svg?url`
    );
    return svg.default;
  },

  async getLocaleAsset(lang: string) {
    const res = await import(
      `../assets/tenants/${process.env.VITE_TENANT}/locales/${lang}.json`
    );
    return res.default;
  },

  async getCssAsset() {
    //gob import see: https://vitejs.dev/guide/features.html#glob-import
    const styles = import.meta.glob("../assets/tenants/*/styles/stile.scss", {
      query: "?inline",
    });
    const res = await styles[
      `../assets/tenants/${process.env.VITE_TENANT}/styles/stile.scss`
    ]();
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    return (res as any).default;
  },

  async applyCss() {
    const styleElem = document.createElement("style");
    document.head.appendChild(styleElem);
    styleElem.textContent = await this.getCssAsset();
  },
};
