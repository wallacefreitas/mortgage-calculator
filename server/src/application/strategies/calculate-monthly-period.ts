import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "@core/abstract/calculate-period.abstract";
import { INTEREST_RATE_THRESHOLD, PAYMENT_FREQUENCY } from "@utils/enums";

export class CalculateMonthlyPeriod implements CalculatePeriod {
  public calculate(
    interestRate: number,
    amortizationPeriod: number
  ): CalculatePeriodResponse {
    return {
      periodicInterestRate: this.calculatePeriodicRate(interestRate),
      numberOfPayments: this.calculateTotalPayments(amortizationPeriod),
    };
  }

  private calculatePeriodicRate(interestRate: number): number {
    const isPercentage =
      interestRate >= INTEREST_RATE_THRESHOLD.PERCENTAGE_THRESHOLD;

    const monthlyRateDecimal = isPercentage ? interestRate / 100 : interestRate;

    return monthlyRateDecimal / PAYMENT_FREQUENCY.MONTHS_IN_YEAR;
  }

  private calculateTotalPayments(amortizationPeriod: number): number {
    return amortizationPeriod * PAYMENT_FREQUENCY.MONTHS_IN_YEAR;
  }
}
