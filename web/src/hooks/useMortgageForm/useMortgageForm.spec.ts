import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMortgageForm } from "./useMortgateForm";
import { act } from "@testing-library/react";

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

  it("should validate required property price", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("propertyPrice");
      await result.current.trigger("propertyPrice");
    });

    expect(result.current.formState.errors.propertyPrice?.message).toBe(
      "Property price is required"
    );
  });

  it("should validate required down payment", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("downPayment");
      await result.current.trigger("downPayment");
    });

    expect(result.current.formState.errors.downPayment?.message).toBe(
      "Down payment is required"
    );
  });

  it("should validate required interest rate", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("interestRate");
      await result.current.trigger("interestRate");
    });

    expect(result.current.formState.errors.interestRate?.message).toBe(
      "Interest rate is required"
    );
  });

  it("should validate positive property price", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("propertyPrice");
      result.current.setValue("propertyPrice", "0");
      await result.current.trigger("propertyPrice");
    });

    expect(result.current.formState.errors.propertyPrice?.message).toBe(
      "Property price must be a positive number"
    );
  });

  it("should validate non-negative down payment", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("downPayment");
      result.current.setValue("downPayment", "-100");
      await result.current.trigger("downPayment");
    });

    expect(result.current.formState.errors.downPayment?.message).toBe(
      "Down payment must be a non-negative number"
    );
  });

  it("should validate interest rate range", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.register("interestRate");
      result.current.setValue("interestRate", "101");
      await result.current.trigger("interestRate");
    });

    expect(result.current.formState.errors.interestRate?.message).toBe(
      "Interest rate must be between 0 and 100"
    );
  });

  it("should accept valid form values", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.setValue("propertyPrice", "500000");
      result.current.setValue("downPayment", "100000");
      result.current.setValue("interestRate", "5.5");
      result.current.setValue("amortizationPeriod", "25");
      result.current.setValue("paymentSchedule", "monthly");

      const isValid = await result.current.trigger();
      expect(isValid).toBe(true);
      expect(result.current.formState.errors).toEqual({});
    });
  });

  it("should transform numeric inputs correctly", async () => {
    const { result } = renderHook(() => useMortgageForm());

    await act(async () => {
      result.current.setValue("propertyPrice", "500,000");
      result.current.setValue("downPayment", "100,000");
      result.current.setValue("interestRate", "5.5%");
      await result.current.trigger();
    });

    expect(result.current.getValues()).toEqual({
      propertyPrice: "500000",
      downPayment: "100000",
      interestRate: "5.5",
      amortizationPeriod: "25",
      paymentSchedule: "monthly",
    });
  });
});
