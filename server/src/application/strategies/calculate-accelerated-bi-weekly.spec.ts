import { describe, it, expect, beforeEach } from "vitest";
import { CalculateAcceleratedBiWeeklyPeriod } from "./calculate-accelerated-bi-weekly";
import { INTEREST_RATE_THRESHOLD, PAYMENT_FREQUENCY } from "@utils/enums";

describe("CalculateAcceleratedBiWeeklyPeriod", () => {
  let calculator: CalculateAcceleratedBiWeeklyPeriod;

  beforeEach(() => {
    calculator = new CalculateAcceleratedBiWeeklyPeriod();
  });

  describe("calculate", () => {
    it("should calculate periodic rate and number of payments correctly with percentage interest rate", () => {
      const interestRate = 5.5;
      const amortizationPeriod = 25;

      const result = calculator.calculate(interestRate, amortizationPeriod);

      expect(result.periodicInterestRate).toBe(
        5.5 / 100 / PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
      expect(result.numberOfPayments).toBe(
        amortizationPeriod * PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
    });

    it("should calculate periodic rate and number of payments correctly with decimal interest rate", () => {
      const interestRate = 0.055;
      const amortizationPeriod = 25;

      const result = calculator.calculate(interestRate, amortizationPeriod);

      expect(result.periodicInterestRate).toBe(
        0.055 / PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
      expect(result.numberOfPayments).toBe(
        amortizationPeriod * PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
    });
  });

  describe("calculatePeriodicRate", () => {
    it("should convert percentage interest rate to periodic rate", () => {
      const interestRate = 5.5;
      const result = calculator["calculatePeriodicRate"](interestRate);

      expect(result).toBe(5.5 / 100 / PAYMENT_FREQUENCY.MONTHS_IN_YEAR);
    });

    it("should convert decimal interest rate to periodic rate", () => {
      const interestRate = 0.055;
      const result = calculator["calculatePeriodicRate"](interestRate);

      expect(result).toBe(0.055 / PAYMENT_FREQUENCY.MONTHS_IN_YEAR);
    });

    it("should correctly identify percentage vs decimal rates using threshold", () => {
      const percentageRate = INTEREST_RATE_THRESHOLD.PERCENTAGE_THRESHOLD + 1;
      const decimalRate = INTEREST_RATE_THRESHOLD.PERCENTAGE_THRESHOLD - 0.1;

      const percentageResult =
        calculator["calculatePeriodicRate"](percentageRate);
      const decimalResult = calculator["calculatePeriodicRate"](decimalRate);

      expect(percentageResult).toBe(
        percentageRate / 100 / PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
      expect(decimalResult).toBe(
        decimalRate / PAYMENT_FREQUENCY.MONTHS_IN_YEAR
      );
    });
  });

  describe("calculateTotalPayments", () => {
    it("should calculate total number of payments for given years", () => {
      const years = 25;
      const result = calculator["calculateTotalPayments"](years);

      expect(result).toBe(years * PAYMENT_FREQUENCY.MONTHS_IN_YEAR);
    });

    it("should handle different amortization periods", () => {
      const testCases = [15, 20, 25, 30];

      testCases.forEach((years) => {
        const result = calculator["calculateTotalPayments"](years);
        expect(result).toBe(years * PAYMENT_FREQUENCY.MONTHS_IN_YEAR);
      });
    });
  });
});
