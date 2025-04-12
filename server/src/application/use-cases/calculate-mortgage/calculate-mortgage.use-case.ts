import { IsValidMortgageArguments } from "@core/decorators/is-valid-mortgage-arguments.decorator";
import { CMHCPremium } from "@core/abstract/cmhc-premium.abstract";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";
import { PAYMENT_SCHEDULE } from "@utils/enums";

export type CalculateMortgageRequest = {
  propertyPrice: number;
  downPayment: number;
  paymentSchedule: string;
  interestRate: number;
  amortizationPeriod: number;
};

export class CalculateMortgageUseCase {
  constructor(
    private readonly chooseCalculatePeriodUseCase: ChooseCalculatePeriodUseCase,
    private readonly cmhcPremiumService: CMHCPremium
  ) {}

  @IsValidMortgageArguments()
  public calculate({
    propertyPrice,
    downPayment,
    paymentSchedule,
    interestRate,
    amortizationPeriod,
  }: CalculateMortgageRequest): number {
    try {
      const cmhcPremium = this.cmhcPremiumService.calculate(
        propertyPrice,
        downPayment
      );

      const loanAmount = propertyPrice - downPayment + cmhcPremium;

      const calculatePeriodChoosed =
        this.chooseCalculatePeriodUseCase.execute(paymentSchedule);

      const { numberOfPayments, periodicInterestRate } =
        calculatePeriodChoosed.calculate(interestRate, amortizationPeriod);

      const payment =
        (loanAmount *
          periodicInterestRate *
          Math.pow(1 + periodicInterestRate, numberOfPayments)) /
        (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1);

      return paymentSchedule === PAYMENT_SCHEDULE.ACCELERATED_BI_WEEKLY
        ? Number(payment.toFixed(2)) / 2
        : Number(payment.toFixed(2));
    } catch (error: any) {
      throw new Error(
        `An error occurred while calculating the mortgage: ${error.message}`
      );
    }
  }
}
