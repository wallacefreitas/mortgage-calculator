import { CalculateAcceleratedBiWeeklyPeriod } from "@application/strategies/calculate-accelerated-bi-weekly";
import { CalculateBiWeeklyPeriod } from "@application/strategies/calculate-bi-weekly-period";
import { CalculateMonthlyPeriod } from "@application/strategies/calculate-monthly-period";
import { CalculatePeriod } from "@core/abstract/calculate-period.abstract";
import { PAYMENT_SCHEDULE } from "@utils/enums";

export class ChooseCalculatePeriodUseCase {
  constructor() {}

  public execute(paymentSchedule: string): CalculatePeriod {
    switch (paymentSchedule) {
      case PAYMENT_SCHEDULE.BI_WEEKLY:
        return new CalculateBiWeeklyPeriod();

      case PAYMENT_SCHEDULE.ACCELERATED_BI_WEEKLY:
        return new CalculateAcceleratedBiWeeklyPeriod();

      case PAYMENT_SCHEDULE.MONTHLY:
        return new CalculateMonthlyPeriod();

      default:
        return new CalculateMonthlyPeriod();
    }
  }
}
