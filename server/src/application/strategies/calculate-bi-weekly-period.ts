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

  private calculatePeriodicRate(annualRate: number): number {
    const isPercentage =
      annualRate >= INTEREST_RATE_THRESHOLD.PERCENTAGE_THRESHOLD;
    const annualRateDecimal = isPercentage ? annualRate / 100 : annualRate;

    return annualRateDecimal / PAYMENT_FREQUENCY.PAYMENTS_PER_YEAR;
  }

  private calculateTotalPayments(years: number): number {
    return years * PAYMENT_FREQUENCY.PAYMENTS_PER_YEAR;
  }
}
