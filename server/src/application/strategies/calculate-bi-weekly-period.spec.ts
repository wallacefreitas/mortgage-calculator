import { describe, it, expect } from "vitest";
import { CalculateBiWeeklyPeriod } from "./calculate-bi-weekly-period";

describe("CalculateBiWeeklyPeriod", () => {
  let calculatePeriod: CalculateBiWeeklyPeriod;

  beforeEach(() => {
    calculatePeriod = new CalculateBiWeeklyPeriod();
  });

  describe("calculate", () => {
    it("should calculate periodic rate and number of payments correctly when rate is percentage", () => {
      const result = calculatePeriod.calculate(5.0, 25);

      expect(result.periodicInterestRate).toBeCloseTo(0.001923, 6); // 5% / 26
      expect(result.numberOfPayments).toBe(650); // 25 years * 26 payments
    });

    it("should calculate periodic rate and number of payments correctly when rate is decimal", () => {
      const result = calculatePeriod.calculate(0.05, 25);

      expect(result.periodicInterestRate).toBeCloseTo(0.001923, 6); // 0.05 / 26
      expect(result.numberOfPayments).toBe(650); // 25 years * 26 payments
    });

    it("should handle zero interest rate", () => {
      const result = calculatePeriod.calculate(0, 25);

      expect(result.periodicInterestRate).toBe(0);
      expect(result.numberOfPayments).toBe(650);
    });

    it("should handle one year amortization period", () => {
      const result = calculatePeriod.calculate(5.0, 1);

      expect(result.periodicInterestRate).toBeCloseTo(0.001923, 6);
      expect(result.numberOfPayments).toBe(26); // 1 year * 26 payments
    });
  });
});
