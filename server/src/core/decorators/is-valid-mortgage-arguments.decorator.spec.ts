import { describe, it, expect, beforeEach } from "vitest";
import { IsValidMortgageArguments } from "./is-valid-mortgage-arguments.decorator";

describe("IsValidMortgageArguments Decorator", () => {
  class TestClass {
    @IsValidMortgageArguments()
    testMethod(request: any) {
      return request;
    }
  }

  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  describe("validateFields", () => {
    it("should throw error when property price is negative", () => {
      const invalidRequest = {
        propertyPrice: -500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Property price must be greater than 0."
      );
    });

    it("should throw error when required fields are missing", () => {
      const invalidRequest = {};

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "All fields are required."
      );
    });

    it("should throw error when property price is not a number", () => {
      const invalidRequest = {
        propertyPrice: "invalid",
        downPayment: 100000,
        interestRate: 5.5,
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Property price must be a valid number."
      );
    });

    it("should throw error when property price exceeds maximum limit", () => {
      const invalidRequest = {
        propertyPrice: 2000000,
        downPayment: 400000,
        interestRate: 5.5,
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Property price cannot exceed $1,500,000."
      );
    });

    it("should throw error when down payment is not a number", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: "invalid",
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Property downPayment must be a valid number."
      );
    });

    it("should throw error when interest rate is not a number", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: "invalid",
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Property interestRate must be a valid number."
      );
    });
  });

  describe("validateDownPayment", () => {
    it("should throw error when down payment is less than minimum required", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 10000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Minimum down payment for this property is $25,000."
      );
    });

    it("should throw error when down payment is negative", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: -10000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Down Payment must be greater than 0."
      );
    });

    it("should calculate correct minimum down payment for property over $500,000", () => {
      const invalidRequest = {
        propertyPrice: 750000,
        downPayment: 35000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Minimum down payment for this property is $50,000."
      );
    });

    it("should throw error when down payment exceeds property price", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 600000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Down payment must be less than the property price."
      );
    });
  });

  describe("validateAmortizationPeriod", () => {
    it("should throw error when amortization period exceeds CMHC limit with low down payment", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 50000,
        interestRate: 5.5,
        amortizationPeriod: 30,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "The maximum amortization period for CMHC-insured mortgages is 25 years."
      );
    });

    it("should throw error when amortization period is less than minimum", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 0,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Amortization period must be at least 1 year(s)."
      );
    });
  });

  describe("validateInterestRate", () => {
    it("should throw error when interest rate is out of valid range", () => {
      const invalidRequests = [
        {
          propertyPrice: 500000,
          downPayment: 100000,
          interestRate: -1,
          amortizationPeriod: 25,
          paymentSchedule: "monthly",
        },
        {
          propertyPrice: 500000,
          downPayment: 100000,
          interestRate: 101,
          amortizationPeriod: 25,
          paymentSchedule: "monthly",
        },
      ];

      invalidRequests.forEach((request) => {
        expect(() => testInstance.testMethod(request)).toThrow(
          "Interest rate must be between 0 and 100."
        );
      });
    });

    it("should throw error when interest rate is out of valid range", () => {
      const invalidRequests = [
        {
          propertyPrice: 500000,
          downPayment: 100000,
          interestRate: -1,
          amortizationPeriod: 25,
          paymentSchedule: "monthly",
        },
        {
          propertyPrice: 500000,
          downPayment: 100000,
          interestRate: 101,
          amortizationPeriod: 25,
          paymentSchedule: "monthly",
        },
      ];

      invalidRequests.forEach((request) => {
        expect(() => testInstance.testMethod(request)).toThrow(
          "Interest rate must be between 0 and 100."
        );
      });
    });
  });

  describe("validatePaymentSchedule", () => {
    it("should throw error when payment schedule is invalid", () => {
      const invalidRequest = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "invalid-schedule",
      };

      expect(() => testInstance.testMethod(invalidRequest)).toThrow(
        "Payment schedule must be one of the following: monthly, bi-weekly, accelerated-bi-weekly."
      );
    });
  });

  describe("valid requests", () => {
    it("should pass validation for valid request", () => {
      const validRequest = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(validRequest)).not.toThrow();
    });

    it("should pass validation with minimum down payment", () => {
      const validRequest = {
        propertyPrice: 500000,
        downPayment: 25000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(validRequest)).not.toThrow();
    });
  });

  describe("valid requests", () => {
    it("should pass validation for valid request", () => {
      const validRequest = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(validRequest)).not.toThrow();
    });

    it("should pass validation with minimum down payment", () => {
      const validRequest = {
        propertyPrice: 500000,
        downPayment: 25000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(validRequest)).not.toThrow();
    });
  });

  describe("edge cases", () => {
    it("should handle property price exactly at maximum limit", () => {
      const request = {
        propertyPrice: 1500000,
        downPayment: 300000,
        interestRate: 5.5,
        amortizationPeriod: 25,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(request)).not.toThrow();
    });

    it("should handle exactly 20% down payment with 30-year amortization", () => {
      const request = {
        propertyPrice: 500000,
        downPayment: 100000,
        interestRate: 5.5,
        amortizationPeriod: 30,
        paymentSchedule: "monthly",
      };

      expect(() => testInstance.testMethod(request)).not.toThrow();
    });

    it("should validate all payment schedule options", () => {
      const validSchedules = ["monthly", "bi-weekly", "accelerated-bi-weekly"];

      validSchedules.forEach((schedule) => {
        const request = {
          propertyPrice: 500000,
          downPayment: 100000,
          interestRate: 5.5,
          amortizationPeriod: 25,
          paymentSchedule: schedule,
        };

        expect(() => testInstance.testMethod(request)).not.toThrow();
      });
    });
  });
});
