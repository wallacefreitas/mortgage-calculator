import { Input } from "../../common/components/ui/input/input";
import { Label } from "../../common/components/ui/label/label";
import { formatPercentage, validateKeyDown } from "../../common/utils/helper";

export interface PercentageInputProps {
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[0-9.]+$/;
    const keysAllowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    validateKeyDown(keysAllowed, regex, event);
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
