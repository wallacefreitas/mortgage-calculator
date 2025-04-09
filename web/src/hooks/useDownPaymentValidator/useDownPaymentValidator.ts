import { formatCurrency } from "../../common/utils/helper";

type ValidateResponse = {
  message: string;
  isDownPaymentValid: boolean;
};

export function useDownPaymentValidator() {
  function validate(
    downPayment: number,
    propertyPrice: number
  ): ValidateResponse {
    const downPaymentPercentage = (downPayment / propertyPrice) * 100;
    const downPaymentPercentageFormatted = formatCurrency(propertyPrice * 0.05);

    if (downPaymentPercentage < 5) {
      return {
        isDownPaymentValid: false,
        message: `Down payment must be at least 5% of the property price (${downPaymentPercentageFormatted})`,
      };
    }

    return {
      isDownPaymentValid: true,
      message: "",
    };
  }

  return { validate };
}
