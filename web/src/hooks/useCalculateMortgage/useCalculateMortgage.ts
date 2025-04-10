import { BASE_URL } from "../../common/utils/helper";
import { MortgageProps } from "../../common/utils/types";

export function useCalculateMortgage() {
  async function executeCalculateMortgage(
    data: MortgageProps
  ): Promise<number> {
    const {
      propertyPrice,
      downPayment,
      interestRate,
      amortizationPeriod,
      paymentSchedule,
    } = data;
    const response = await fetch(`${BASE_URL}/mortgage/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyPrice,
        downPayment,
        interestRate,
        amortizationPeriod,
        paymentSchedule,
      }),
    });
    const { finalPayment } = await response.json();

    return finalPayment;
  }

  return {
    executeCalculateMortgage,
  };
}
