import { Product } from 'use-shopping-cart';

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  return numberFormat.format(amount)
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? parseInt(amount.toFixed())*100 : Math.abs(amount * 100)
}

export function formatAmountFromStripe(
  amount: number,
  currency: string
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount / 100)
}

/**
 * Returns the parsed product to send to /api/checkout_session
 * @param product 
 * @returns 
 */
export const parseStripeProduct = (product: Product) => {
  return {
    name: product.name,
    currency: product.currency,
    description: product.description,
    amount: product.price,
    // TODO: Add image for the product here if necessary
    quantity: 1
  }
}