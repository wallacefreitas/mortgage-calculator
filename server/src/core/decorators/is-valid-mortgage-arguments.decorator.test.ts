import { describe, it, expect, vi } from "vitest";
import { IsValidMortgageArguments } from "./is-valid-mortgage-arguments.decorator";

describe("IsValidMortgageArguments Decorator", () => {
  class TestClass {
    @IsValidMortgageArguments()
    testMethod(request: any) {
      return "Valid";
    }
  }

  const instance = new TestClass();

  it("should throw an error if propertyPrice is less than or equal to 0", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 0,
        downPayment: 10,
        interestRate: 5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Property price must be greater than 0.");
  });

  it("should throw an error if downPayment is negative", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: -10,
        interestRate: 5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Down payment cannot be negative.");
  });

  it("should throw an error if downPayment is greater than or equal to propertyPrice", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: 100000,
        interestRate: 5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Down payment must be less than the property price.");
  });

  it("should throw an error if interestRate is less than or equal to 0", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: 20000,
        interestRate: 0,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Interest rate must be between 0 and 100.");
  });

  it("should throw an error if interestRate is greater than 100", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: 20000,
        interestRate: 101,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Interest rate must be between 0 and 100.");
  });

  it("should throw an error if amortizationPeriod is less than or equal to 0", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: 20000,
        interestRate: 5,
        amortizationPeriod: 0,
        paymentSchedule: "monthly",
      })
    ).toThrowError("Amortization period must be greater than 0.");
  });

  it("should throw an error if paymentSchedule is invalid", () => {
    expect(() =>
      instance.testMethod({
        propertyPrice: 100000,
        downPayment: 20000,
        interestRate: 5,
        amortizationPeriod: 25,
        paymentSchedule: "weekly",
      })
    ).toThrowError(
      "Payment schedule must be one of the following: monthly, bi-weekly, accelerated-bi-weekly."
    );
  });

  it("should call the original method if all arguments are valid", () => {
    const spy = vi.spyOn(instance, "testMethod");
    const result = instance.testMethod({
      propertyPrice: 100000,
      downPayment: 20000,
      interestRate: 5,
      amortizationPeriod: 25,
      paymentSchedule: "monthly",
    });

    expect(result).toBe("Valid");
    expect(spy).toHaveBeenCalledOnce();
  });
});
