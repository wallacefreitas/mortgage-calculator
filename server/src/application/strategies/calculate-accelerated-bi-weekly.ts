import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "@core/abstract/calculate-period.abstract";

export class CalculateAcceleratedBiWeeklyPeriod implements CalculatePeriod {
  public calculate(
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
    const annualRateDecimal = isPercentage ? annualRate / 100 : annualRate;
    return annualRateDecimal / 12 / 2;
  }

  private calculateTotalPayments(years: number): number {
    return years * 26;
  }
}
