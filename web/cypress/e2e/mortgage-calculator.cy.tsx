describe("Mortgage Calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should calculate the mortgage payment correctly", () => {
    cy.get("#propertyPrice").should("be.enabled").clear().type("300000");
    cy.get("#downPayment").should("be.enabled").clear().type("15000");
    cy.get("input[placeholder='Enter rate']").should("be.enabled").type("5");

    cy.get("#amortization-period")
      .should("be.visible")
      .and("be.enabled")
      .click({ force: true });

    cy.get('[role="option"]').should("be.visible").contains("25 years").click();

    cy.get("#paymentSchedule")
      .should("be.visible")
      .and("be.enabled")
      .click({ force: true });

    cy.get('[role="option"]').should("be.visible").contains("Monthly").click();

    cy.get("button[type='submit']").should("be.enabled").click();

    cy.contains("Your Monthly Payment").should("be.visible");
  });

  it("should show an error for invalid down payment", () => {
    cy.get("#propertyPrice").type("500000");
    cy.get("#downPayment").type("10000");
    cy.get("input[placeholder='Enter rate']").type("5");

    cy.wait(500);

    cy.get("#amortization-period").click({ force: true });
    cy.get('[role="option"]').contains("25 years").click();

    cy.get("button[type='submit']").click();

    cy.contains("Down payment must be at least").should("be.visible");
  });

  it("should handle payment schedule selection", () => {
    cy.wait(500);

    cy.get("#paymentSchedule").click({ force: true });
    cy.get('[role="option"]').should("have.length.gt", 0);
    cy.get('[role="option"]').contains("Monthly").click();
    cy.get("#paymentSchedule").should("contain", "Monthly");
  });

  it("should validate minimum property price", () => {
    cy.get("#propertyPrice").should("be.enabled").clear().type("1000");
    cy.get("#downPayment").should("be.enabled").clear().type("200");
    cy.get("input[placeholder='Enter rate']")
      .should("be.enabled")
      .clear()
      .type("5");

    cy.get("#amortization-period").click({ force: true });
    cy.get('[role="option"]').contains("25 years").click();

    cy.get("button[type='submit']").click();

    cy.contains("Property price is required").should("be.visible");
  });

  it("should calculate payments for different amortization periods", () => {
    const periods = [
      "5 years",
      "10 years",
      "15 years",
      "20 years",
      "25 years",
      "30 years",
    ];

    cy.get("#propertyPrice").type("500000");
    cy.get("#downPayment").type("100000");
    cy.get("input[placeholder='Enter rate']").type("5");

    periods.forEach((period) => {
      cy.get("#amortization-period").click({ force: true });
      cy.get('[role="option"]').contains(period).click();
      cy.get("button[type='submit']").click();
      cy.contains("Your Monthly Payment").should("be.visible");
    });
  });

  it("should calculate payments for different payment schedules", () => {
    const schedules = ["Weekly", "Bi-Weekly", "Monthly"];

    cy.get("#propertyPrice").type("500000");
    cy.get("#downPayment").type("100000");
    cy.get("input[placeholder='Enter rate']").type("5");

    cy.get("#amortization-period").click({ force: true });
    cy.get('[role="option"]').contains("25 years").click();

    schedules.forEach((schedule) => {
      cy.get("#paymentSchedule").click({ force: true });
      cy.get('[role="option"]').contains(schedule).click();
      cy.get("button[type='submit']").click();

      cy.wait(1000);

      cy.get('[data-testid="payment-result"]').should("contain", schedule);
    });
  });

  it("should validate numeric inputs only", () => {
    cy.get("#propertyPrice")
      .should("be.enabled")
      .clear()
      .type("abc")
      .invoke("val")
      .should("match", /^\d*$/);

    cy.get("#downPayment")
      .should("be.enabled")
      .clear()
      .type("abc")
      .invoke("val")
      .should("match", /^\d*$/);

    cy.get("input[placeholder='Enter rate']")
      .should("be.enabled")
      .clear()
      .type("abc")
      .invoke("val")
      .should("match", /^\d*\.?\d*$/);

    cy.get("#propertyPrice")
      .clear()
      .type("123abc456")
      .invoke("val")
      .should("match", /^\d*$/);

    cy.get("#propertyPrice")
      .clear()
      .type("!@#$%^")
      .invoke("val")
      .should("match", /^\d*$/);

    cy.get("#propertyPrice")
      .clear()
      .type("500000")
      .should("have.value", "500000");
  });
});
