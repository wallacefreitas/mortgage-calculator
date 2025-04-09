import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { CalculateMortgageController } from "./calculate-mortgage.controller";
import { CalculateMortgageUseCase } from "@application/use-cases/calculate-mortgage/calculate-mortgage.use-case";

describe("CalculateMortgageController", () => {
  let calculateMortgageController: CalculateMortgageController;
  let calculateMortgageUseCase: CalculateMortgageUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: ReturnType<typeof vi.fn>;
  let mockStatus: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    calculateMortgageUseCase = {
      calculate: vi.fn(),
    } as unknown as CalculateMortgageUseCase;

    calculateMortgageController = new CalculateMortgageController(
      calculateMortgageUseCase
    );

    mockJson = vi.fn().mockReturnValue({});
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
  });

  it("should calculate mortgage payment successfully", async () => {
    const mockRequestBody = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "MONTHLY",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    const expectedPayment = 2500.75;
    vi.spyOn(calculateMortgageUseCase, "calculate").mockReturnValue(
      expectedPayment
    );

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(calculateMortgageUseCase.calculate).toHaveBeenCalledWith(
      mockRequestBody
    );
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      finalPayment: expectedPayment,
    });
  });

  it("should handle missing required fields", async () => {
    const mockRequestBody = {
      propertyPrice: 500000,
      paymentSchedule: "MONTHLY",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    vi.spyOn(calculateMortgageUseCase, "calculate").mockImplementation(() => {
      throw new Error("Missing required fields");
    });

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Missing required fields",
    });
  });

  it("should handle invalid input values", async () => {
    const mockRequestBody = {
      propertyPrice: -500000,
      downPayment: 100000,
      paymentSchedule: "MONTHLY",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    vi.spyOn(calculateMortgageUseCase, "calculate").mockImplementation(() => {
      throw new Error("Invalid property price");
    });

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Invalid property price",
    });
  });

  it("should handle unexpected errors", async () => {
    const mockRequestBody = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "MONTHLY",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    vi.spyOn(calculateMortgageUseCase, "calculate").mockImplementation(() => {
      throw new Error();
    });

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Unexpected error",
    });
  });

  it("should handle invalid payment schedule", async () => {
    const mockRequestBody = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "INVALID_SCHEDULE",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    vi.spyOn(calculateMortgageUseCase, "calculate").mockImplementation(() => {
      throw new Error("Invalid payment schedule");
    });

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Invalid payment schedule",
    });
  });

  it("should validate response structure", async () => {
    const mockRequestBody = {
      propertyPrice: 500000,
      downPayment: 100000,
      paymentSchedule: "MONTHLY",
      interestRate: 6,
      amortizationPeriod: 25,
    };

    mockRequest = {
      body: mockRequestBody,
    };

    const expectedPayment = 2500.75;
    vi.spyOn(calculateMortgageUseCase, "calculate").mockReturnValue(
      expectedPayment
    );

    await calculateMortgageController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        finalPayment: expect.any(Number),
      })
    );
  });
});
