export function formatCurrency(value: string | number | null): string {
  if (value === null) return "-";

  if (typeof value === "string") {
    const numericValue = value.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
      .format(Number(numericValue))
      .replace("$", "");
  }

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");

  if (parts.length > 2) {
    return `${parts[0]}.${parts[1]}`;
  }

  return numericValue ? `${numericValue}` : "";
}

export function validateKeyDown(
  keysAllowed: string[],
  regex: RegExp,
  event: React.KeyboardEvent<HTMLInputElement>
) {
  try {
    if (!regex.test(event.key) && !keysAllowed.includes(event.key)) {
      event.preventDefault();
    }
  } catch (error) {
    console.error("Error handling key down event:", error);
  }
}
