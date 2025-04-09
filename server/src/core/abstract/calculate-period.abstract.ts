export type CalculatePeriodResponse = {
  periodicInterestRate: number;
  numberOfPayments: number;
};

export abstract class CalculatePeriod {
  abstract calculate(
    interestRate: number,
    amortizationPeriod: number
  ): CalculatePeriodResponse;
}
