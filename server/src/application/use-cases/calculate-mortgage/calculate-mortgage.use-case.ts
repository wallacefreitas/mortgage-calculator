import { IsValidMortgageArguments } from "@core/decorators/is-valid-mortgage-arguments.decorator";
import { CMHCPremium } from "@core/abstract/cmhc-premium.abstract";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";

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
      const cmhcPremiumRate = this.cmhcPremiumService.calculate(
        propertyPrice,
        downPayment
      );

      const loanAmount = propertyPrice - downPayment;
      const cmhcPremium = loanAmount * cmhcPremiumRate;
      const totalLoanAmount = loanAmount + cmhcPremium;

      const calculatePeriodChoosed =
        this.chooseCalculatePeriodUseCase.execute(paymentSchedule);

      const { numberOfPayments, periodicInterestRate } =
        calculatePeriodChoosed.calculate(interestRate, amortizationPeriod);

      const powerTerm = Math.pow(1 + periodicInterestRate, numberOfPayments);
      const numerator = periodicInterestRate * powerTerm;
      const denominator = powerTerm - 1;
      const rateFactors = Number((numerator / denominator).toFixed(8));
      const payment = totalLoanAmount * rateFactors;
      const basePayment = Math.round(payment * 100) / 100;

      return Number(basePayment.toFixed(2));
    } catch (error) {
      throw new Error("An error occurred while calculating the mortgage.");
    }
  }
}
