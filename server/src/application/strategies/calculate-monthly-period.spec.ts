import { describe, it, expect } from "vitest";
import { CalculateMonthlyPeriod } from "./calculate-monthly-period";

describe("CalculateMonthlyPeriod", () => {
  const calculateMonthlyPeriod = new CalculateMonthlyPeriod();

  describe("calculate", () => {
    it("should calculate periodic interest rate and number of payments for a given interest rate and amortization period", () => {
      const interestRate = 5; // 5% annual interest rate
      const amortizationPeriod = 25; // 25 years

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0041666667); // 5% / 100 / 12
      expect(result.numberOfPayments).toBe(300); // 25 * 12
    });

    it("should handle interest rates less than 1 as decimal values", () => {
      const interestRate = 0.05; // 0.05 annual interest rate (5%)
      const amortizationPeriod = 10; // 10 years

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0041666667); // 0.05 / 12
      expect(result.numberOfPayments).toBe(120); // 10 * 12
    });

    it("should return 0 for periodic interest rate if annual interest rate is 0", () => {
      const interestRate = 0; // 0% annual interest rate
      const amortizationPeriod = 15; // 15 years

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBe(0);
      expect(result.numberOfPayments).toBe(180); // 15 * 12
    });

    it("should return 0 for number of payments if amortization period is 0", () => {
      const interestRate = 3; // 3% annual interest rate
      const amortizationPeriod = 0; // 0 years

      const result = calculateMonthlyPeriod.calculate(
        interestRate,
        amortizationPeriod
      );

      expect(result.periodicInterestRate).toBeCloseTo(0.0025); // 3% / 100 / 12
      expect(result.numberOfPayments).toBe(0);
    });
  });
});
