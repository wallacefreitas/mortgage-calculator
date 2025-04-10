export function IsValidMortgageArguments() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [request] = args;

      if (request.propertyPrice <= 0) {
        throw new Error("Property price must be greater than 0.");
      }

      if (request.downPayment < 0) {
        throw new Error("Down payment cannot be negative.");
      }

      if (request.downPayment > request.propertyPrice) {
        throw new Error("Down payment must be less than the property price.");
      }

      if (request.interestRate <= 0 || request.interestRate > 100) {
        throw new Error("Interest rate must be between 0 and 100.");
      }

      if (request.amortizationPeriod <= 0) {
        throw new Error("Amortization period must be greater than 0.");
      }

      const validSchedules = ["monthly", "bi-weekly", "accelerated-bi-weekly"];
      if (!validSchedules.includes(request.paymentSchedule)) {
        throw new Error(
          `Payment schedule must be one of the following: ${validSchedules.join(
            ", "
          )}.`
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
