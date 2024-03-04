export function formatCurrency(value) {
  return new Intl.NumberFormat("bg", {
    style: "currency",
    currency: "BGN",
  }).format(value);
}
