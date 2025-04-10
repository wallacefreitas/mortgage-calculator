import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type MortgageFormData = z.infer<typeof mortgageFormSchema>;

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
    paymentSchedule: z.string({
      required_error: "Please select a payment schedule",
    }),
  })
  .refine((data) => Number(data.downPayment) <= Number(data.propertyPrice), {
    message: "Down payment cannot exceed property price",
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
