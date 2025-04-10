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
