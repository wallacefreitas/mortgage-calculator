import { Request, Response } from "express";
import { CalculateMortgageUseCase } from "@application/use-cases/calculate-mortgage/calculate-mortgage.use-case";

export class CalculateMortgageController {
  constructor(private calculateMortgageUseCase: CalculateMortgageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        propertyPrice,
        downPayment,
        paymentSchedule,
        interestRate,
        amortizationPeriod,
      } = request.body;

      const finalPayment = this.calculateMortgageUseCase.calculate({
        propertyPrice,
        downPayment,
        paymentSchedule,
        interestRate,
        amortizationPeriod,
      });

      return response.status(200).json({
        finalPayment,
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || "Unexpected error",
      });
    }
  }
}
