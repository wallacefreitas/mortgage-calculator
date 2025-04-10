import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMortgageForm } from "./useMortgateForm";

describe("useMortgageForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useMortgageForm());

    expect(result.current.getValues()).toEqual({
      propertyPrice: "",
      downPayment: "",
      interestRate: "",
      amortizationPeriod: "25",
      paymentSchedule: "monthly",
    });
  });
});
