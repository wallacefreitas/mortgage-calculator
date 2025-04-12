import { BASE_URL } from "../../common/utils/constants";
import { MortgageProps } from "../../common/utils/types";

export function useCalculateMortgage() {
  async function executeCalculateMortgage(
    data: MortgageProps
  ): Promise<number> {
    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred.");
      }

      const { finalPayment } = await response.json();

      return finalPayment;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An error occurred while calculating the mortgage."
      );
    }
  }

  return {
    executeCalculateMortgage,
  };
}
