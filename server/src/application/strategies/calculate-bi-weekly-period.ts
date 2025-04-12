import {
  CalculatePeriod,
  CalculatePeriodResponse,
} from "../../core/abstract/calculate-period.abstract";
import { INTEREST_RATE_THRESHOLD, PAYMENT_FREQUENCY } from "@utils/enums";

export class CalculateBiWeeklyPeriod implements CalculatePeriod {
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

    const biWeeklyRateDecimal = isPercentage
      ? interestRate / 100
      : interestRate;

    return biWeeklyRateDecimal / PAYMENT_FREQUENCY.PAYMENTS_PER_YEAR;
  }

  private calculateTotalPayments(amortizationPeriod: number): number {
    return amortizationPeriod * PAYMENT_FREQUENCY.PAYMENTS_PER_YEAR;
  }
}
