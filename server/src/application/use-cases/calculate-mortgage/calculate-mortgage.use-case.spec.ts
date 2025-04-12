import { describe, it, expect, beforeEach, vi } from "vitest";
import { CalculateMortgageUseCase } from "./calculate-mortgage.use-case";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";
import { CMHCPremium } from "@core/abstract/cmhc-premium.abstract";
import { PAYMENT_SCHEDULE } from "@utils/enums";

describe("CalculateMortgageUseCase", () => {
  let calculateMortgageUseCase: CalculateMortgageUseCase;
  let chooseCalculatePeriodUseCase: ChooseCalculatePeriodUseCase;
  let cmhcPremiumService: CMHCPremium;

  beforeEach(() => {
    chooseCalculatePeriodUseCase = {
      execute: vi.fn().mockReturnValue({
        calculate: vi.fn().mockReturnValue({
          numberOfPayments: 300,
          periodicInterestRate: 0.00416667,
        }),
      }),
    } as any;

    cmhcPremiumService = {
      calculate: vi.fn().mockImplementation((propertyPrice, downPayment) => {
        const downPaymentPercentage = (downPayment / propertyPrice) * 100;
        if (downPaymentPercentage >= 20) return 0;
        if (downPaymentPercentage >= 15) return 0.028;
        if (downPaymentPercentage >= 10) return 0.031;
        return 0.04;
      }),
    };

    calculateMortgageUseCase = new CalculateMortgageUseCase(
      chooseCalculatePeriodUseCase,
      cmhcPremiumService
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

  it("should throw a custom error when an exception occurs", () => {
    vi.spyOn(cmhcPremiumService, "calculate").mockImplementation(() => {
      throw new Error("Simulated service error");
    });

    const request = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "monthly",
      interestRate: 5,
      amortizationPeriod: 25,
    };

    expect(() => {
      calculateMortgageUseCase.calculate(request);
    }).toThrow(
      "An error occurred while calculating the mortgage: Simulated service error"
    );
  });
});
