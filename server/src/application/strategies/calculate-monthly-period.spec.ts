import { describe, it, expect } from "vitest";
import { CalculateMonthlyPeriod } from "./calculate-monthly-period";

describe("CalculateMonthlyPeriod", () => {
  const calculateMonthlyPeriod = new CalculateMonthlyPeriod();

  describe("calculate", () => {
    it("should calculate periodic interest rate and number of payments for a given interest rate and amortization period", () => {
      const interestRate = 5;
      const amortizationPeriod = 25;

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0041666667);
      expect(result.numberOfPayments).toBe(300);
    });

    it("should handle interest rates less than 1 as decimal values", () => {
      const interestRate = 0.05;
      const amortizationPeriod = 10;

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0041666667);
      expect(result.numberOfPayments).toBe(120);
    });

    it("should return 0 for periodic interest rate if annual interest rate is 0", () => {
      const interestRate = 0;
      const amortizationPeriod = 15;

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBe(0);
      expect(result.numberOfPayments).toBe(180);
    });

    it("should return 0 for number of payments if amortization period is 0", () => {
      const interestRate = 3;
      const amortizationPeriod = 0;

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0025);
      expect(result.numberOfPayments).toBe(0);
    });
  });
});
