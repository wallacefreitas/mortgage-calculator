import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "../../core/abstract/calculate-period.abstract";

export class CalculateMonthlyPeriod implements CalculatePeriod {
  calculate(
    interestRate: number,
    amortizationPeriod: number
  ): CalculatePeriodResponse {
    const periodicInterestRate = interestRate / 12;
    const numberOfPayments = amortizationPeriod * 12;

    return {
      periodicInterestRate,
      numberOfPayments,
    };
  }
}
