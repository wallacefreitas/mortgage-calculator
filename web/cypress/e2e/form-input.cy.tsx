describe("Form Input Components", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should handle currency inputs correctly", () => {
    cy.get("#propertyPrice")
      .should("be.visible")
      .type("500000")
      .blur()
      .should("have.value", "500,000");

    cy.get("#downPayment")
      .should("be.visible")
      .type("100000")
      .blur()
      .should("have.value", "100,000");
  });

  it("should handle percentage input correctly", () => {
    cy.get("input[placeholder='Enter rate']")
      .should("be.visible")
      .type("5.5")
      .blur()
      .should("have.value", "5.5");
  });

  it("should validate numeric inputs", () => {
    cy.get("#propertyPrice").type("abc123!@#").should("have.value", "123");
    cy.get("#downPayment").type("abc123!@#").should("have.value", "123");
    cy.get("input[placeholder='Enter rate']")
      .type("abc12.5!@#")
      .should("have.value", "12.5");
  });
});
