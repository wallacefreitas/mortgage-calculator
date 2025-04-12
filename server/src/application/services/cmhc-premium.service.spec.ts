import { describe, it, expect, beforeEach } from "vitest";
import { CMHCPremiumService } from "./cmhc-premium.service";

describe("CMHCPremiumService", () => {
  let cmhcPremiumService: CMHCPremiumService;

  beforeEach(() => {
    cmhcPremiumService = new CMHCPremiumService();
  });

  describe("calculate", () => {
    it("should return 0 premium rate when down payment is 20% or more", () => {
      const propertyPrice = 500000;
      const downPayment = 100000;

      const result = cmhcPremiumService.calculate(propertyPrice, downPayment);

      expect(result).toBe(0);
    });

    it("should return 2.8% premium rate when down payment is between 15% and 19.99%", () => {
      const propertyPrice = 500000;
      const downPayment = 80000;

      const result = cmhcPremiumService.calculate(propertyPrice, downPayment);

      expect(result).toBe(0.028);
    });

    it("should return 3.1% premium rate when down payment is between 10% and 14.99%", () => {
      const propertyPrice = 500000;
      const downPayment = 60000;

      const result = cmhcPremiumService.calculate(propertyPrice, downPayment);

      expect(result).toBe(0.031);
    });

    it("should return 4% premium rate when down payment is less than 10%", () => {
      const propertyPrice = 500000;
      const downPayment = 25000;

      const result = cmhcPremiumService.calculate(propertyPrice, downPayment);

      expect(result).toBe(0.04);
    });
  });

  describe("calculateDownPaymentPercentage", () => {
    it("should calculate down payment percentage correctly", () => {
      const propertyPrice = 500000;
      const downPayment = 75000;

      const result = cmhcPremiumService["calculateDownPaymentPercentage"](
        propertyPrice,
        downPayment
      );

      expect(result).toBe(15);
    });
  });

  describe("getPremiumRate", () => {
    it("should return correct premium rate for each down payment tier", () => {
      expect(cmhcPremiumService["getPremiumRate"](25)).toBe(0);
      expect(cmhcPremiumService["getPremiumRate"](17)).toBe(0.028);
      expect(cmhcPremiumService["getPremiumRate"](12)).toBe(0.031);
      expect(cmhcPremiumService["getPremiumRate"](5)).toBe(0.04);
    });

    it("should return default rate of 4% for invalid down payment percentage", () => {
      const result = cmhcPremiumService["getPremiumRate"](-5);
      expect(result).toBe(0.04);
    });
  });
});
