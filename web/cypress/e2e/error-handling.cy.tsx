describe("Error Handling", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should validate required fields", () => {
    cy.get("button[type='submit']").click();

    cy.contains("Property price is required").should("be.visible");
    cy.contains("Down payment is required").should("be.visible");
    cy.contains("Interest rate is required").should("be.visible");
  });

  it("should validate minimum down payment", () => {
    cy.get("#propertyPrice").type("500000");
    cy.get("#downPayment").type("10000");
    cy.get("input[placeholder='Enter rate']").type("5");

    cy.get("#amortization-period").click({ force: true });
    cy.get("[role='option']").contains("25 years").click({ force: true });

    cy.get("#paymentSchedule").click({ force: true });
    cy.get("[role='option']").contains("Monthly").click({ force: true });

    cy.get("button[type='submit']").click();

    cy.wait(500);

    cy.contains(
      "Down payment does not meet the minimum required for this price."
    ).should("be.visible");
  });
});
