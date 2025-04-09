import { PAYMENT_SCHEDULE } from "@utils/enums";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";

type CalculateMortgageRequest = {
  propertyPrice: number;
  downPayment: number;
  paymentSchedule: string;
  interestRate: number;
  amortizationPeriod: number;
};

export class CalculateMortgageUseCase {
  constructor(
    private readonly chooseCalculatePeriodUseCase: ChooseCalculatePeriodUseCase
  ) {}

  calculate({
    propertyPrice,
    downPayment,
    paymentSchedule,
    interestRate,
    amortizationPeriod,
  }: CalculateMortgageRequest): number {
    const loanAmount = propertyPrice - downPayment;

    const calculatePeriodChoosed =
      this.chooseCalculatePeriodUseCase.execute(paymentSchedule);

    const { numberOfPayments, periodicInterestRate } =
      calculatePeriodChoosed.calculate(interestRate, amortizationPeriod);

    const payment =
      (loanAmount *
        periodicInterestRate *
        Math.pow(1 + periodicInterestRate, numberOfPayments)) /
      (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1);

    const finalPayment =
      paymentSchedule === PAYMENT_SCHEDULE.ACCELERATED_BI_WEEKLY
        ? (payment * 12) / 26
        : payment;

    return finalPayment;
  }
}
