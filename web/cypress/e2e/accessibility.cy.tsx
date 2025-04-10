describe("Accessibility", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have proper labels and ARIA attributes", () => {
    cy.get('label[for="propertyPrice"]').should("be.visible");
    cy.get('label[for="downPayment"]').should("be.visible");
    cy.get('label[for="interestRate"]').should("be.visible");

    cy.get('[data-testid="amortization-period"]').should(
      "have.attr",
      "aria-label"
    );
    cy.get("#paymentSchedule").should("have.attr", "aria-label");
  });

  it("should maintain focus management", () => {
    cy.get("#propertyPrice").focus().should("be.focused");
    cy.get("#downPayment").focus().should("be.focused");
    cy.get("input[placeholder='Enter rate']").focus().should("be.focused");
  });
});
