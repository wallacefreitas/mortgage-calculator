import { CalculateMortgageController } from "@infra/http/controller/calculate-mortgage.controller";
import { CalculateMortgageUseCase } from "./calculate-mortgage.use-case";
import { ChooseCalculatePeriodUseCase } from "../choose-calculate-period/choose-calculate-period.use-case";

const chooseCaculatePeriodUseCase = new ChooseCalculatePeriodUseCase();
const calculateMortgageUseCase = new CalculateMortgageUseCase(
  chooseCaculatePeriodUseCase
);
const calculateMortgageController = new CalculateMortgageController(
  calculateMortgageUseCase
);

export { calculateMortgageUseCase, calculateMortgageController };
