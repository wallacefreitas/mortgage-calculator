import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PeriodSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PeriodSelect({
  id,
  value,
  onChange,
  ...props
}: PeriodSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="amortizationPeriod">Amortization Period</Label>
      <div className="mt-3">
        <Select
          value={value}
          onValueChange={onChange}
          data-testid="amortization-period"
          {...props}
        >
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 years</SelectItem>
            <SelectItem value="10">10 years</SelectItem>
            <SelectItem value="15">15 years</SelectItem>
            <SelectItem value="20">20 years</SelectItem>
            <SelectItem value="25">25 years</SelectItem>
            <SelectItem value="30">30 years</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
