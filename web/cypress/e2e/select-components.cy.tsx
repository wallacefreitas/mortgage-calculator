describe("Select Components", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should handle amortization period selection", () => {
    cy.get("#amortization-period").click({ force: true });
    cy.get("[role='option']").contains("25 years").click({ force: true });
    cy.get("#amortization-period").should("contain", "25 years");
  });

  it("should handle payment schedule selection", () => {
    cy.get("#paymentSchedule").click({ force: true });
    cy.get("[role='option']").contains("Monthly").click({ force: true });
    cy.get("#paymentSchedule").should("contain", "Monthly");
  });
});
