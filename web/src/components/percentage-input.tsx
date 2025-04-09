import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PercentageInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function PercentageInput({
  id,
  label,
  value,
  placeholder,
  onChange,
}: PercentageInputProps) {
  const formatPercentage = (value: string): string => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");

    if (parts.length > 2) {
      return `${parts[0]}.${parts[1]}`;
    }

    return numericValue ? `${numericValue}` : "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keysAllowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!/[0-9.]/.test(event.key) && !keysAllowed.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPercentage(event.target.value);
    onChange(formattedValue);
  };

  return (
    <div className="space-y-0.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          value={`${value}`}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="pr-7"
          inputMode="numeric"
          placeholder={placeholder}
        />
        <div className="absolute right-3 top-2.5 text-gray-500">%</div>
      </div>
    </div>
  );
}
