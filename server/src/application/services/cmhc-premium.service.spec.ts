import { describe, it, expect, beforeEach } from "vitest";
import { CMHCPremiumService } from "./cmhc-premium.service";

describe("CMHCPremiumService", () => {
  let service: CMHCPremiumService;

  beforeEach(() => {
    service = new CMHCPremiumService();
  });

  describe("Premium Rate Calculations", () => {
    it("should return 0% premium for down payment >= 20%", () => {
      expect(service.calculate(500000, 100000)).toBe(0);
      expect(service.calculate(500000, 150000)).toBe(0);
    });

    it("should return 2.8% premium for down payment between 15% and 19.99%", () => {
      expect(service.calculate(500000, 75000)).toBe(0.028);
      expect(service.calculate(500000, 90000)).toBe(0.028);
    });

    it("should return 3.1% premium for down payment between 10% and 14.99%", () => {
      expect(service.calculate(500000, 50000)).toBe(0.031);
      expect(service.calculate(500000, 65000)).toBe(0.031);
    });

    it("should return 4% premium for down payment < 10%", () => {
      expect(service.calculate(500000, 25000)).toBe(0.04);
    });
  });

  describe("getPremiumRate", () => {
    it("should return 0% premium when down payment percentage is 20% or higher", () => {
      expect(service["getPremiumRate"](20)).toBe(0);
      expect(service["getPremiumRate"](25)).toBe(0);
      expect(service["getPremiumRate"](100)).toBe(0);
    });

    it("should return 2.8% premium when down payment percentage is between 15% and 19.99%", () => {
      expect(service["getPremiumRate"](15)).toBe(0.028);
      expect(service["getPremiumRate"](17.5)).toBe(0.028);
      expect(service["getPremiumRate"](19.99)).toBe(0.028);
    });

    it("should return 3.1% premium when down payment percentage is between 10% and 14.99%", () => {
      expect(service["getPremiumRate"](10)).toBe(0.031);
      expect(service["getPremiumRate"](12.5)).toBe(0.031);
      expect(service["getPremiumRate"](14.99)).toBe(0.031);
    });

    it("should return 4% premium when down payment percentage is less than 10%", () => {
      expect(service["getPremiumRate"](0)).toBe(0.04);
      expect(service["getPremiumRate"](5)).toBe(0.04);
      expect(service["getPremiumRate"](9.99)).toBe(0.04);
    });

    it("should handle edge cases and boundary values", () => {
      expect(service["getPremiumRate"](20)).toBe(0);
      expect(service["getPremiumRate"](15)).toBe(0.028);
      expect(service["getPremiumRate"](10)).toBe(0.031);
      expect(service["getPremiumRate"](0)).toBe(0.04);

      expect(service["getPremiumRate"](19.5)).toBe(0.028);
      expect(service["getPremiumRate"](14.5)).toBe(0.031);
      expect(service["getPremiumRate"](9.5)).toBe(0.04);
    });

    it("should handle extreme values", () => {
      expect(service["getPremiumRate"](1000)).toBe(0);
      expect(service["getPremiumRate"](-10)).toBe(0.04);
    });
  });

  describe("Edge Cases", () => {
    it("should handle decimal down payments correctly", () => {
      expect(service.calculate(500000, 77500)).toBe(0.028);
    });

    it("should handle large numbers correctly", () => {
      expect(service.calculate(2000000, 200000)).toBe(0.031);
    });

    it("should handle small numbers correctly", () => {
      expect(service.calculate(100000, 10000)).toBe(0.031);
    });
  });
});
