import { describe, it, expect, beforeEach } from "vitest";
import { CalculateAcceleratedBiWeeklyPeriod } from "./calculate-accelerated-bi-weekly";

describe("CalculateAcceleratedBiWeeklyPeriod", () => {
  let calculatePeriod: CalculateAcceleratedBiWeeklyPeriod;

  beforeEach(() => {
    calculatePeriod = new CalculateAcceleratedBiWeeklyPeriod();
  });

  describe("calculate", () => {
    it("should calculate periodic rate and number of payments correctly when rate is percentage", () => {
      const result = calculatePeriod.calculate(5.0, 25);

      expect(result.periodicInterestRate).toBeCloseTo(0.002083, 6);
      expect(result.numberOfPayments).toBe(650);
    });

    it("should calculate periodic rate and number of payments correctly when rate is decimal", () => {
      const result = calculatePeriod.calculate(0.05, 25);

      expect(result.periodicInterestRate).toBeCloseTo(0.002083, 6);
      expect(result.numberOfPayments).toBe(650);
    });

    it("should handle zero interest rate", () => {
      const result = calculatePeriod.calculate(0, 25);

      expect(result.periodicInterestRate).toBe(0);
      expect(result.numberOfPayments).toBe(650);
    });

    it("should handle one year amortization period", () => {
      const result = calculatePeriod.calculate(5.0, 1);

      expect(result.periodicInterestRate).toBeCloseTo(0.002083, 6);
      expect(result.numberOfPayments).toBe(26);
    });
  });
});
