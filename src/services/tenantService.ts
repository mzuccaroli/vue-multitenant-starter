export default {
  getTenant(): string {
    return process.env.VITE_TENANT || "Vue";
  },
  getImgAsset(asset: string): string {
    return new URL(
      `../assets/img/${this.getTenant()}/${asset}`,
      import.meta.url
    ).href;
  },
  async importCss() {
    await import(`../styles/${this.getTenant()}/stile.scss`);
  },
};
