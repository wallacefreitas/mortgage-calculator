import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "@core/abstract/calculate-period.abstract";

export class CalculateMonthlyPeriod implements CalculatePeriod {
  calculate(
    interestRate: number,
    amortizationPeriod: number
  ): CalculatePeriodResponse {
    return {
      periodicInterestRate: this.calculatePeriodicRate(interestRate),
      numberOfPayments: this.calculateTotalPayments(amortizationPeriod),
    };
  }

  private calculatePeriodicRate(annualRate: number): number {
    const isPercentage = annualRate >= 1;
    return isPercentage ? annualRate / 100 / 12 : annualRate / 12;
  }

  private calculateTotalPayments(years: number): number {
    return years * 12;
  }
}
