import { describe, it, expect, beforeEach } from "vitest";
import { ChooseCalculatePeriodUseCase } from "./choose-calculate-period.use-case";
import { CalculateBiWeeklyPeriod } from "@application/strategies/calculate-bi-weekly-period";
import { CalculateAcceleratedBiWeeklyPeriod } from "../../strategies/calculate-accelerated-bi-weekly";
import { CalculateMonthlyPeriod } from "@application/strategies/calculate-monthly-period";
import { PAYMENT_SCHEDULE } from "@utils/enums";

describe("ChooseCalculatePeriodUseCase", () => {
  let choosePeriodUseCase: ChooseCalculatePeriodUseCase;

  beforeEach(() => {
    choosePeriodUseCase = new ChooseCalculatePeriodUseCase();
  });

  it("should return CalculateBiWeeklyPeriod when payment schedule is BI_WEEKLY", () => {
    const result = choosePeriodUseCase.execute(PAYMENT_SCHEDULE.BI_WEEKLY);
    expect(result).toBeInstanceOf(CalculateBiWeeklyPeriod);
  });

  it("should return CalculateAcceleratedBiWeeklyPeriod when payment schedule is ACCELERATED_BI_WEEKLY", () => {
    const result = choosePeriodUseCase.execute(
      PAYMENT_SCHEDULE.ACCELERATED_BI_WEEKLY
    );
    expect(result).toBeInstanceOf(CalculateAcceleratedBiWeeklyPeriod);
  });

  it("should return CalculateMonthlyPeriod when payment schedule is MONTHLY", () => {
    const result = choosePeriodUseCase.execute(PAYMENT_SCHEDULE.MONTHLY);
    expect(result).toBeInstanceOf(CalculateMonthlyPeriod);
  });

  it("should return CalculateMonthlyPeriod as default when payment schedule is invalid", () => {
    const result = choosePeriodUseCase.execute("INVALID_SCHEDULE");
    expect(result).toBeInstanceOf(CalculateMonthlyPeriod);
  });
});
