import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "../common/utils/helper";

interface PaymentResultProps {
  paymentSchedule: string;
  payment: number;
}

export default function PaymentResultCard({
  payment,
  paymentSchedule,
}: PaymentResultProps) {
  return (
    <Card data-testid="payment-result">
      <CardHeader>
        <CardTitle>Payment Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">
            {`Your ${
              paymentSchedule === "monthly" ? "Monthly" : "Bi-Weekly"
            } Payment`}
          </div>
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(payment)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {paymentSchedule === "monthly"
              ? "per month"
              : paymentSchedule === "bi-weekly"
              ? "every two weeks"
              : "accelerated bi-weekly"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
