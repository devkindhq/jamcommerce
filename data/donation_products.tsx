import { Product as Prod } from 'use-shopping-cart';

export interface Product extends Prod { 
  name: string,
  description?: string | undefined,
  id: string
  price: number
  image?: string
  attribution?: string
  currency: string
  base_currency: string
  base_price: number
  original_price?: number
  onClick?: (() => void) | undefined,
  min_price?: number,
  max_price?: number
}

type Products = Product[]
const product = (): Products => {
  return [
    {
      name: 'One time meal for a family',
      description: 'A one-time meal to a family of 6.',
      id: 'one_time_meal',
      price: 1000,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 1000
    },
    {
      name: 'Medical and hygiene pack',
      description:'A one-time basic medical & hygiene supply to a family including essentials for women and children.',
      id: 'basic_medical_hygiene',
      price: 2000,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 2000
    },
    {
      name: 'Ration pack for a family',
      description: 'Provide a one week ration to a family.',
      id: 'one_week_ration',
      price: 3500,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 3500
    },
    {
      name: 'Month-long meal, medical & basic hygiene supply',
      id: 'meal_medical_pack',
      description: 'Provide a month\'s meal, medical & basic hygiene supply to a family',
      price: 10000,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 10000
    },
    {
      name: 'Tent + Month-long meal, medical & basic hygiene supply',
      id: 'tent_meal_medical',
      description: 'Provide a shelter, one month’s meal, medical & basic hygiene supply for a family.',
      price: 20000,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 20000
    },
    {
      name: 'Custom Donation',
      id: 'custom',
      description: 'Tap here to select your custom amount of donation',
      price: 1000,
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 1000,
      min_price: 1000,
      max_price: 30000
    },
  ].sort((prev,current) => current.price - prev.price)
}
  export default product
  