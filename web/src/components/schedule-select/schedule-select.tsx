import { Label } from "../../common/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/components/ui/select/select";

interface ScheduleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ScheduleSelect({
  value,
  onChange,
}: ScheduleSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="paymentSchedule" aria-label="payment-schedule">
        Payment Schedule
      </Label>
      <div className="mt-3">
        <Select
          value={value}
          onValueChange={onChange}
          data-testid="payment-schedule"
        >
          <SelectTrigger
            id="paymentSchedule"
            className="w-full"
            data-testid="payment-schedule"
            aria-label="payment-schedule"
          >
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              data-testid="payment-schedule-accelerated-bi-weekly"
              aria-label="payment-schedule-accelerated-bi-weekly"
              value="accelerated-bi-weekly"
            >
              Accelerated Bi-Weekly
            </SelectItem>
            <SelectItem
              data-testid="payment-schedule-bi-weekly"
              aria-label="payment-schedule-bi-weekly"
              value="bi-weekly"
            >
              Bi-Weekly
            </SelectItem>
            <SelectItem
              data-testid="payment-schedule-monthly"
              aria-label="payment-schedule-monthly"
              value="monthly"
            >
              Monthly
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
