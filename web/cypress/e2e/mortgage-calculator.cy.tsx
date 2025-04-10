describe("Mortgage Calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the mortgage calculator form", () => {
    cy.contains("Mortgage Details").should("be.visible");
    cy.get('[data-testid="property-price"]').should("be.visible");
    cy.get("#interestRate").should("be.visible");
    cy.get('[data-testid="down-payment"]').should("exist");
    cy.get('[data-testid="amortization-period"]').should("exist");
    cy.contains("Payment Schedule").should("be.visible");
    cy.get('button[type="submit"]')
      .should("be.visible")
      .contains("Calculate Payment");
  });

  it("should calculate mortgage payment correctly", () => {
    cy.get('[data-testid="property-price"]').type("300000");
    cy.get('[data-testid="down-payment"]').type("60000");
    cy.get("#interestRate").type("5");

    // Or with more specific path
    cy.get('[data-testid="amortization-period"]').click();
    cy.get('[data-testid="amortization-period-30"]').click();

    cy.get('[data-testid="payment-schedule"]').click();
    cy.get('[data-testid="payment-schedule-monthly"]').click();
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="payment-result"]').should("be.visible");
    cy.contains("Your Monthly Payment").should("be.visible");
  });

  it("should show error for invalid down payment", () => {
    // Fill in the form with invalid down payment (less than 5%)
    cy.get('[data-testid="property-price"]').type("300000");
    cy.get('[data-testid="down-payment"]').type("10000"); // Less than 5%
    cy.get("#interestRate").type("5");

    // Select amortization period
    cy.get('[data-testid="amortization-period"]').click();
    cy.get('[role="option"]').contains("25 years").click();

    // Select payment schedule
    cy.get('[data-testid="payment-schedule"]').click();
    cy.get('[role="option"]').contains("Monthly").click();

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check error message
    cy.contains("Down payment must be at least").should("be.visible");
  });

  it("should handle different payment schedules", () => {
    const schedules = ["Weekly", "Bi-Weekly", "Monthly"];

    // Fill in the form
    cy.get('[data-testid="property-price"]').type("300000");
    cy.get('[data-testid="down-payment"]').type("60000");
    cy.get("#interestRate").type("5");

    // Select amortization period
    cy.get('[data-testid="amortization-period"]').click();
    cy.get('[role="option"]').contains("25 years").click();

    // Test each payment schedule
    schedules.forEach((schedule) => {
      // Select payment schedule
      cy.get('[data-testid="payment-schedule"]').click();
      cy.get('[role="option"]').contains(schedule).click();

      // Submit form
      cy.get('button[type="submit"]').click();

      // Check result shows correct schedule
      cy.get('[data-testid="payment-result"]').should("contain", schedule);
    });
  });

  it("should handle different amortization periods", () => {
    const periods = [
      "5 years",
      "10 years",
      "15 years",
      "20 years",
      "25 years",
      "30 years",
    ];

    // Fill in the form
    cy.get('[data-testid="property-price"]').type("300000");
    cy.get('[data-testid="down-payment"]').type("60000");
    cy.get("#interestRate").type("5");

    // Select payment schedule
    cy.get('[data-testid="payment-schedule"]').click();
    cy.get('[role="option"]').contains("Monthly").click();

    // Test each amortization period
    periods.forEach((period) => {
      // Select amortization period
      cy.get('[data-testid="amortization-period"]').click();
      cy.get('[role="option"]').contains(period).click();

      // Submit form
      cy.get('button[type="submit"]').click();

      // Check result is displayed
      cy.get('[data-testid="payment-result"]').should("be.visible");
    });
  });

  it("should handle payment schedule selection", () => {
    cy.wait(500);

    cy.get("#paymentSchedule").click({ force: true });
    cy.get('[role="option"]').should("have.length.gt", 0);
    cy.get('[role="option"]').contains("Monthly").click();
    cy.get("#paymentSchedule").should("contain", "Monthly");
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

    // Test each period individually instead of using forEach
    for (const period of periods) {
      cy.get('[data-testid="amortization-period"]').click();
      cy.get('[role="option"]').contains(period).click();
      cy.get('button[type="submit"]').click();

      // Wait for calculation to complete
      cy.wait(1000);

      // Verify the payment result is displayed
      cy.get('[data-testid="payment-result"]').should("be.visible");
      cy.contains("Your Monthly Payment").should("be.visible");
    }
  });
});
