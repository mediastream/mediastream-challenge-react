export const formatCurrencyValue = (
  value,
  options = { style: 'currency', currency: 'USD' },
) =>
  new Intl.NumberFormat('en-US', {
    ...options,
    maximumFractionDigits: 8,
  }).format(Number(value));