import { useState } from "react";
import { AlertCircle, Info } from "lucide-react";
import { Button } from "../../common/components/ui/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../common/components/ui/form/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../common/components/ui/card/card";
import {
  Alert,
  AlertDescription,
} from "../../common/components/ui/alert/alert";
import ScheduleSelect from "../../components/schedule-select/schedule-select";
import PeriodSelect from "../../components/period-select/period-select";
import CurrencyInput from "../../components/currency-input/currency-input";
import PaymentResultCard from "../../components/payment-result-card/payment-result-card";
import PercentageInput from "../../components/percentage-input/percentage-input";
import { useCalculateMortgage } from "../../hooks/useCalculateMortgage/useCalculateMortgage";
import { useMortgageForm } from "../../hooks/useMortgageForm/useMortgateForm";
import { MortgageProps } from "../../common/utils/types";

export default function MortgageCalculator() {
  const [payment, setPayment] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeCalculateMortgage } = useCalculateMortgage();
  const form = useMortgageForm();

  async function onSubmit(values: MortgageProps) {
    try {
      setIsLoading(true);

      const propertyPrice = Number(values.propertyPrice);
      const downPayment = Number(values.downPayment);
      const interestRate = Number(values.interestRate);
      const amortizationPeriod = Number(values.amortizationPeriod);
      const paymentSchedule = values.paymentSchedule.toLowerCase();

      const finalPayment = await executeCalculateMortgage({
        propertyPrice,
        downPayment,
        interestRate,
        amortizationPeriod,
        paymentSchedule,
      });

      setPayment(finalPayment);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Details</CardTitle>
          <CardDescription>
            Enter your mortgage details to calculate your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="propertyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="propertyPrice"
                        id="property-price-label"
                      >
                        Property Price
                      </FormLabel>
                      <FormControl>
                        <CurrencyInput
                          id="propertyPrice"
                          data-testid="property-price"
                          aria-labelledby="property-price-label"
                          label=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="downPayment" id="down-payment-label">
                        Down Payment
                      </FormLabel>
                      <FormControl>
                        <CurrencyInput
                          id="downPayment"
                          label=""
                          data-testid="down-payment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="interestRate" id="interest-rate">
                        Annual Interest Rate
                      </FormLabel>
                      <FormControl>
                        <PercentageInput
                          id="interestRate"
                          label=""
                          placeholder="Enter rate"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="amortizationPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <PeriodSelect
                          id="amortization-period"
                          onChange={field.onChange}
                          value={field.value}
                          data-testid="amortization-period"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <ScheduleSelect
                          value={field.value.toLowerCase()}
                          onChange={field.onChange}
                          data-testid="payment-schedule"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                {isLoading ? "Calculating..." : "Calculate Payment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <PaymentResultCard
        payment={payment || 0}
        paymentSchedule={form.getValues().paymentSchedule}
      />

      <Alert variant="default" className="bg-blue-50">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This calculator provides estimates only. Speak with a mortgage
          professional for accurate rates and terms.
        </AlertDescription>
      </Alert>
    </div>
  );
}
