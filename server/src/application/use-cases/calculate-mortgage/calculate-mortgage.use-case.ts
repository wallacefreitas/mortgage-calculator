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

    const powerTerm = Math.pow(1 + periodicInterestRate, numberOfPayments); // Step 1: Calculate (1 + r)^n
    const numerator = periodicInterestRate * powerTerm; // Step 2: Calculate r * (1 + r)^n
    const denominator = powerTerm - 1; // Step 3: Calculate (1 + r)^n - 1
    const rateFactors = Number((numerator / denominator).toFixed(12)); // Step 4: Calculate rate factors with fixed precision
    const payment = totalLoanAmount * rateFactors; // Step 5: Calculate payment
    const basePayment = Math.round(payment * 100) / 100; // Step 6: Round to 2 decimal places using Math.round

    return Number(basePayment.toFixed(2));
  }
}
