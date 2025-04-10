import { CalculateMortgageController } from "@infra/http/controller/calculate-mortgage.controller";
import { CMHCPremiumService } from "@application/services/cmhc-premium.service";
import { CalculateMortgageUseCase } from "./calculate-mortgage.use-case";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";

const chooseCaculatePeriodUseCase = new ChooseCalculatePeriodUseCase();
const cmhcPremiumService = new CMHCPremiumService();

const calculateMortgageUseCase = new CalculateMortgageUseCase(
  chooseCaculatePeriodUseCase,
  cmhcPremiumService
);

const calculateMortgageController = new CalculateMortgageController(
  calculateMortgageUseCase
);

export { calculateMortgageUseCase, calculateMortgageController };
