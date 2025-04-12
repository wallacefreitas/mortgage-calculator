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

function PeriodSelectItems() {
  const items = [
    { id: "amortization-period-5", value: "5", label: "5 years" },
    { id: "amortization-period-10", value: "10", label: "10 years" },
    { id: "amortization-period-15", value: "15", label: "15 years" },
    { id: "amortization-period-20", value: "20", label: "20 years" },
    { id: "amortization-period-25", value: "25", label: "25 years" },
    { id: "amortization-period-30", value: "30", label: "30 years" },
  ];

  return items.map((item) => (
    <SelectItem
      data-testid={item.id}
      aria-label={item.id}
      key={item.value}
      value={item.value}
    >
      {item.label}
    </SelectItem>
  ));
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
            <PeriodSelectItems />
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
