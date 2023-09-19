describe("Smoke test", () => {
  beforeEach(() => {
    cy.gotoRoot();
  });

  it("App should exist", () => {
    cy.get("#app");
  });
});
