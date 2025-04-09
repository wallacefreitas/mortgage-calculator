import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCalculateMortgage } from "./useCalculateMortgage";

describe("useCalculateMortgage", () => {
  const mockMortgageData = {
    propertyPrice: 500000,
    downPayment: 100000,
    interestRate: 5.5,
    amortizationPeriod: 25,
    paymentSchedule: "monthly",
  };

  const mockResponse = {
    finalPayment: 2500.75,
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should calculate mortgage payment successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useCalculateMortgage());
    const response = await result.current.executeCalculateMortgage(
      mockMortgageData
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/mortgage/calculate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockMortgageData),
      }
    );
    expect(response).toBe(mockResponse.finalPayment);
  });

  it("should handle API error", async () => {
    const errorMessage = "API Error";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCalculateMortgage());

    await expect(
      result.current.executeCalculateMortgage(mockMortgageData)
    ).rejects.toThrow(errorMessage);
  });

  it("should handle invalid JSON response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.reject(new Error("Invalid JSON")),
    });

    const { result } = renderHook(() => useCalculateMortgage());

    await expect(
      result.current.executeCalculateMortgage(mockMortgageData)
    ).rejects.toThrow("Invalid JSON");
  });

  it("should handle network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useCalculateMortgage());

    await expect(
      result.current.executeCalculateMortgage(mockMortgageData)
    ).rejects.toThrow("Network error");
  });

  // it("should handle empty response", async () => {
  //   (global.fetch as any).mockResolvedValueOnce({
  //     json: () => Promise.resolve({}),
  //   });

  //   const { result } = renderHook(() => useCalculateMortgage());

  //   await expect(
  //     result.current.executeCalculateMortgage(mockMortgageData)
  //   ).rejects.toThrow("Invalid response format");
  // });
});
