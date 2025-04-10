import { Label } from "../../common/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/components/ui/select/select";

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
      <Label
        htmlFor="amortizationPeriod"
        id="amortization-period-label"
        aria-label="amortization-period-label"
      >
        Amortization Period
      </Label>
      <div className="mt-3">
        <Select
          value={value}
          onValueChange={onChange}
          data-testid="amortization-period"
          {...props}
        >
          <SelectTrigger
            id={id}
            className="w-full"
            data-testid="amortization-period"
            aria-label="amortization-period"
          >
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              data-testid="amortization-period-5"
              aria-label="amortization-period-5"
              value="5"
            >
              5 years
            </SelectItem>
            <SelectItem
              data-testid="amortization-period-10"
              aria-label="amortization-period-10"
              value="10"
            >
              10 years
            </SelectItem>
            <SelectItem
              data-testid="amortization-period-15"
              aria-label="amortization-period-15"
              value="15"
            >
              15 years
            </SelectItem>
            <SelectItem
              data-testid="amortization-period-20"
              aria-label="amortization-period-20"
              value="20"
            >
              20 years
            </SelectItem>
            <SelectItem
              data-testid="amortization-period-25"
              aria-label="amortization-period-25"
              value="25"
            >
              25 years
            </SelectItem>
            <SelectItem
              data-testid="amortization-period-30"
              aria-label="amortization-period-30"
              value="30"
            >
              30 years
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
