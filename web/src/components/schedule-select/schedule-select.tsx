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
      <Label htmlFor="paymentSchedule">Payment Schedule</Label>
      <div className="mt-3">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="paymentSchedule" className="w-full">
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accelerated-bi-weekly">
              Accelerated Bi-Weekly
            </SelectItem>
            <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
