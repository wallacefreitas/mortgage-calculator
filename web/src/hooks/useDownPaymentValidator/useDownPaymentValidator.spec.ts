import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDownPaymentValidator } from "./useDownPaymentValidator";

describe("useDownPaymentValidator", () => {
  it("should return invalid when down payment is less than 5% of property price", () => {
    const downPayment = 24999; // 4.99% of 500000
    const propertyPrice = 500000;

    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(false);
    expect(message).toBe(
      "Down payment must be at least 5% of the property price ($25,000.00)"
    );
  });

  it("should return valid when down payment is exactly 5% of property price", () => {
    const downPayment = 25000; // 5% of 500000
    const propertyPrice = 500000;

    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(true);
    expect(message).toBe("");
  });

  it("should return valid when down payment is more than 5% of property price", () => {
    const downPayment = 50000; // 10% of 500000
    const propertyPrice = 500000;

    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(true);
    expect(message).toBe("");
  });

  it("should handle zero property price", () => {
    const downPayment = 0;
    const propertyPrice = 0;

    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(false);
    expect(message).toBe("Property price must be greater than zero");
  });

  it("should handle non-zero down payment with zero property price", () => {
    const downPayment = 1000;
    const propertyPrice = 0;

    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(false);
    expect(message).toBe("Property price must be greater than zero");
  });

  it("should handle decimal values correctly", () => {
    const downPayment = 25000.5;
    const propertyPrice = 500000.0;
    const { result } = renderHook(() => useDownPaymentValidator());
    const { isDownPaymentValid, message } = result.current.validate(
      downPayment,
      propertyPrice
    );

    expect(isDownPaymentValid).toBe(true);
    expect(message).toBe("");
  });
});
