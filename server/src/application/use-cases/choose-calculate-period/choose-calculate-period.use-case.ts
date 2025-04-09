import { CalculateBiWeeklyPeriod } from "@application/strategies/calculate-bi-weekly-period";
import { CalculateMonthlyPeriod } from "@application/strategies/calculate-monthly-period";
import { CalculatePeriod } from "@core/abstract/calculate-period.abstract";
import { PAYMENT_SCHEDULE } from "@utils/enums";

export class ChooseCalculatePeriodUseCase {
  constructor() {}

  execute(paymentSchedule: string): CalculatePeriod {
    if (paymentSchedule === PAYMENT_SCHEDULE.MONTHLY) {
      return new CalculateMonthlyPeriod();
    } else if (paymentSchedule === PAYMENT_SCHEDULE.BI_WEEKLY) {
      return new CalculateBiWeeklyPeriod();
    } else if (paymentSchedule === PAYMENT_SCHEDULE.ACCELERATED_BI_WEEKLY) {
      return new CalculateMonthlyPeriod();
    }

    return new CalculateMonthlyPeriod();
  }
}
