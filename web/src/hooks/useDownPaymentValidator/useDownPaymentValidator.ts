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
    if (propertyPrice <= 0) {
      return {
        isDownPaymentValid: false,
        message: "Property price must be greater than zero",
      };
    }

    const minimumDownPayment = propertyPrice * 0.05;
    const isValid = downPayment >= minimumDownPayment;

    return {
      isDownPaymentValid: isValid,
      message: isValid
        ? ""
        : `Down payment must be at least 5% of the property price (${formatCurrency(
            minimumDownPayment
          )})`,
    };
  }

  return { validate };
}
