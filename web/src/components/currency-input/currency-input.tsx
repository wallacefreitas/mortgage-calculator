import { Input } from "../../common/components/ui/input/input";
import { Label } from "../../common/components/ui/label/label";

interface CurrencyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencyInput({
  id,
  label,
  value,
  onChange,
}: CurrencyInputProps) {
  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, "");

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
      .format(Number(numericValue))
      .replace("$", "");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keysAllowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!/[0-9]/.test(event.key) && !keysAllowed.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(event.target.value);
    onChange(formattedValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          $
        </span>
        <Input
          id={id}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="pl-8 bg-blue-50"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}
