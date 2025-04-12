const MAX_PRICE_PER_PROPERTY = 1500000;
const MIN_DOWN_PAYMENT_PERCENTAGE = 0.05;
const ADDITIONAL_DOWN_PAYMENT_PERCENTAGE = 0.1;
const CMHC_MAX_AMORTIZATION_PERIOD = 25;
const MAX_INTEREST_RATE = 100;
const MIN_INTEREST_RATE = 0;
const MIN_AMORTIZATION_PERIOD = 1;
const VALID_PAYMENT_SCHEDULES = [
  "monthly",
  "bi-weekly",
  "accelerated-bi-weekly",
];

function calculateMinimumDownPayment(propertyPrice: number): number {
  return propertyPrice <= 500000
    ? propertyPrice * MIN_DOWN_PAYMENT_PERCENTAGE
    : 500_000 * MIN_DOWN_PAYMENT_PERCENTAGE +
        (propertyPrice - 500_000) * ADDITIONAL_DOWN_PAYMENT_PERCENTAGE;
}

function validateFields(request: any): void {
  if (!request.propertyPrice || !request.downPayment || !request.interestRate) {
    throw new Error("All fields are required.");
  }

  if (
    typeof request.propertyPrice !== "number" ||
    isNaN(request.propertyPrice)
  ) {
    throw new Error("Property price must be a valid number.");
  }

  if (request.propertyPrice <= 0) {
    throw new Error("Property price must be greater than 0.");
  }

  if (request.propertyPrice > MAX_PRICE_PER_PROPERTY) {
    throw new Error(
      `Property price cannot exceed $${MAX_PRICE_PER_PROPERTY.toLocaleString()}.`
    );
  }

  if (typeof request.downPayment !== "number" || isNaN(request.downPayment)) {
    throw new Error("Property downPayment must be a valid number.");
  }

  if (request.downPayment <= 0) {
    throw new Error("Down Payment must be greater than 0.");
  }

  if (typeof request.interestRate !== "number" || isNaN(request.interestRate)) {
    throw new Error("Property interestRate must be a valid number.");
  }
}

function validateDownPayment(request: any): void {
  const minDownPayment = calculateMinimumDownPayment(request.propertyPrice);

  if (request.downPayment < minDownPayment) {
    throw new Error(
      `Minimum down payment for this property is $${minDownPayment.toLocaleString()}.`
    );
  }

  if (request.downPayment < 0) {
    throw new Error("Down payment cannot be negative.");
  }

  if (request.downPayment > request.propertyPrice) {
    throw new Error("Down payment must be less than the property price.");
  }
}

function validateAmortizationPeriod(request: any): void {
  if (
    request.downPayment < 0.2 * request.propertyPrice &&
    request.amortizationPeriod > CMHC_MAX_AMORTIZATION_PERIOD
  ) {
    throw new Error(
      `The maximum amortization period for CMHC-insured mortgages is ${CMHC_MAX_AMORTIZATION_PERIOD} years.`
    );
  }

  if (request.amortizationPeriod < MIN_AMORTIZATION_PERIOD) {
    throw new Error(
      `Amortization period must be at least ${MIN_AMORTIZATION_PERIOD} year(s).`
    );
  }
}

function validateInterestRate(request: any): void {
  if (
    request.interestRate <= MIN_INTEREST_RATE ||
    request.interestRate > MAX_INTEREST_RATE
  ) {
    throw new Error(
      `Interest rate must be between ${MIN_INTEREST_RATE} and ${MAX_INTEREST_RATE}.`
    );
  }
}

function validatePaymentSchedule(request: any): void {
  if (!VALID_PAYMENT_SCHEDULES.includes(request.paymentSchedule)) {
    throw new Error(
      `Payment schedule must be one of the following: ${VALID_PAYMENT_SCHEDULES.join(
        ", "
      )}.`
    );
  }
}

export function IsValidMortgageArguments() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [request] = args;

      validateFields(request);
      validateDownPayment(request);
      validateAmortizationPeriod(request);
      validateInterestRate(request);
      validatePaymentSchedule(request);

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
