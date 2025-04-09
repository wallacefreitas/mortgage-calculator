import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "../../core/abstract/calculate-period.abstract";

export class CalculateBiWeeklyPeriod implements CalculatePeriod {
  calculate(
    interestRate: number,
    amortizationPeriod: number
  ): CalculatePeriodResponse {
    const periodicInterestRate = interestRate / 26;
    const numberOfPayments = amortizationPeriod * 26;

    return {
      periodicInterestRate,
      numberOfPayments,
    };
  }
}
