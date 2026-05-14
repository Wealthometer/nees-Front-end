export function formatNaira(value) {
  const amount = Number(value)
  if (Number.isNaN(amount)) return '0'

  return amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

