const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export default function formatCurrency(number: number) {
  return (
    CURRENCY_FORMATTER.format(number)   
  )
}
