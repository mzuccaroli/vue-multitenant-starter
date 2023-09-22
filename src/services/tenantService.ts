export default {
  getTenant(): string {
    return process.env.VITE_TENANT || "Vue";
  },
  getImgAsset(asset: string): string {
    return new URL(
      `../assets/tenants/${process.env.VITE_TENANT}/img/${asset}`,
      import.meta.url
    ).href;
  },

  async getLocaleAsset(lang: string) {
    return import(
      `../assets/tenants/${process.env.VITE_TENANT}/locales/${lang}.json`
    );
  },
  async importCss() {
    await import(
      `../assets/tenants/${process.env.VITE_TENANT}/styles/stile.scss`
    );
  },
};
