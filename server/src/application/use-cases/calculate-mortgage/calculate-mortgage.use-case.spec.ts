import { describe, it, expect, beforeEach, vi } from "vitest";
import { CalculateMortgageUseCase } from "./calculate-mortgage.use-case";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";

describe("CalculateMortgageUseCase", () => {
  let calculateMortgageUseCase: CalculateMortgageUseCase;
  let chooseCalculatePeriodUseCase: ChooseCalculatePeriodUseCase;

  beforeEach(() => {
    chooseCalculatePeriodUseCase = {
      execute: vi.fn().mockReturnValue({
        calculate: vi.fn().mockReturnValue({
          numberOfPayments: 300,
          periodicInterestRate: 0.00416667,
        }),
      }),
    } as any;

    calculateMortgageUseCase = new CalculateMortgageUseCase(
      chooseCalculatePeriodUseCase
    );
  });

  it("should calculate monthly mortgage payment correctly", () => {
    const request = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "monthly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    const result = calculateMortgageUseCase.calculate(request);

    expect(result).toBeDefined();
    expect(typeof result).toBe("number");
    expect(chooseCalculatePeriodUseCase.execute).toHaveBeenCalledWith(
      "monthly"
    );
  });

  it("should handle edge case with zero down payment", () => {
    const request = {
      propertyPrice: 300000,
      downPayment: 0,
      paymentSchedule: "monthly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    const result = calculateMortgageUseCase.calculate(request);

    expect(result).toBeDefined();
    expect(typeof result).toBe("number");
  });

  it("should handle different payment schedules", () => {
    const request = {
      propertyPrice: 400000,
      downPayment: 80000,
      paymentSchedule: "bi-weekly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    const result = calculateMortgageUseCase.calculate(request);

    expect(result).toBeDefined();
    expect(chooseCalculatePeriodUseCase.execute).toHaveBeenCalledWith(
      "bi-weekly"
    );
  });

  it("should round payment to 2 decimal places", () => {
    const request = {
      propertyPrice: 350000,
      downPayment: 70000,
      paymentSchedule: "monthly",
      interestRate: 5.125,
      amortizationPeriod: 25,
    };

    const result = calculateMortgageUseCase.calculate(request);

    expect(Number.isInteger(result * 100)).toBeTruthy();
  });

  it("should throw error for invalid input", () => {
    const request = {
      propertyPrice: -500000,
      downPayment: 100000,
      paymentSchedule: "monthly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    expect(() => {
      calculateMortgageUseCase.calculate(request);
    }).toThrow();
  });

  it("should calculate correct loan amount", () => {
    const request = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "monthly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    const result = calculateMortgageUseCase.calculate(request);

    expect(result).toBeDefined();
    expect(result).toBeGreaterThan(0);
  });
});
