import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type MortgageFormData = z.infer<typeof mortgageFormSchema>;

const MAX_PRICE_PER_PROPERTY = 1500000;
const MIN_DOWN_PAYMENT_PERCENTAGE = 0.05;
const ADDITIONAL_DOWN_PAYMENT_PERCENTAGE = 0.1;
const MAX_AMORTIZATION_PERIOD = 25;

function calculateMinimumDownPayment(propertyPrice: number): number {
  return propertyPrice <= 500000
    ? propertyPrice * MIN_DOWN_PAYMENT_PERCENTAGE
    : 500000 * MIN_DOWN_PAYMENT_PERCENTAGE +
        (propertyPrice - 500000) * ADDITIONAL_DOWN_PAYMENT_PERCENTAGE;
}

function validateHighValueProperty(data: {
  propertyPrice: string;
  downPayment: string;
}): boolean {
  const propertyPrice = Number(data.propertyPrice);
  const downPayment = Number(data.downPayment);
  return (
    propertyPrice <= MAX_PRICE_PER_PROPERTY ||
    downPayment >= propertyPrice * 0.2
  );
}

function validateMinimumDownPayment(data: {
  propertyPrice: string;
  downPayment: string;
}): boolean {
  const propertyPrice = Number(data.propertyPrice);
  const downPayment = Number(data.downPayment);
  const minimumDownPayment = calculateMinimumDownPayment(propertyPrice);
  return downPayment >= minimumDownPayment;
}

function validateAmortizationPeriod(data: {
  propertyPrice: string;
  downPayment: string;
  amortizationPeriod: string;
}): boolean {
  const propertyPrice = Number(data.propertyPrice);
  const downPayment = Number(data.downPayment);
  const amortizationPeriod = Number(data.amortizationPeriod);
  return (
    downPayment >= propertyPrice * 0.2 ||
    amortizationPeriod <= MAX_AMORTIZATION_PERIOD
  );
}

const mortgageFormSchema = z
  .object({
    propertyPrice: z
      .string()
      .min(1, { message: "Property price is required" })
      .transform((val) => val.replace(/[^0-9]/g, ""))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Property price must be a positive number",
      }),
    downPayment: z
      .string()
      .min(1, { message: "Down payment is required" })
      .transform((val) => val.replace(/[^0-9]/g, ""))
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Down payment must be a non-negative number",
      }),
    interestRate: z
      .string()
      .min(1, { message: "Interest rate is required" })
      .transform((val) => val.replace(/[^0-9.]/g, ""))
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100,
        {
          message: "Interest rate must be between 0 and 100",
        }
      ),
    amortizationPeriod: z.string({
      required_error: "Please select an amortization period",
    }),
    paymentSchedule: z
      .string({
        required_error: "Please select a payment schedule",
      })
      .refine(
        (val) =>
          ["monthly", "bi-weekly", "accelerated-bi-weekly"].includes(val),
        {
          message: "Invalid payment schedule selected.",
        }
      ),
  })
  .refine(
    (data) =>
      Number(data.propertyPrice) <= MAX_PRICE_PER_PROPERTY ||
      Number(data.downPayment) >= Number(data.propertyPrice) * 0.2,
    {
      message: `For properties over $${MAX_PRICE_PER_PROPERTY.toLocaleString()}, the minimum down payment is 20%.`,
      path: ["downPayment"],
    }
  )
  .refine(validateHighValueProperty, {
    message: `For properties over $${MAX_PRICE_PER_PROPERTY.toLocaleString()}, the minimum down payment is 20%.`,
    path: ["downPayment"],
  })
  .refine(validateMinimumDownPayment, {
    message: "Down payment does not meet the minimum required for this price.",
    path: ["downPayment"],
  })
  .refine(validateAmortizationPeriod, {
    message:
      "The maximum amortization period for mortgages with less than 20% down payment is 25 years.",
    path: ["amortizationPeriod"],
  })
  .refine((data) => Number(data.downPayment) < Number(data.propertyPrice), {
    message: "Down payment must be less than the property price.",
    path: ["downPayment"],
  });

export function useMortgageForm() {
  return useForm<MortgageFormData>({
    resolver: zodResolver(mortgageFormSchema),
    defaultValues: {
      propertyPrice: "",
      downPayment: "",
      interestRate: "",
      amortizationPeriod: "25",
      paymentSchedule: "monthly",
    },
    mode: "all",
  });
}
