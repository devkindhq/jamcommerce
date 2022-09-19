import { Product as Prod } from 'use-shopping-cart';

export interface Product extends Prod { 
  name: string,
  description?: string | undefined,
  id: string
  price: number
  image?: string
  attribution: string
  currency: string
  base_currency: string
  base_price: number
  original_price?: number
  onClick?: (() => void) | undefined
}

type Products = Product[]
const product = (): Products => {
  return [
    {
      name: 'One time meal for a family',
      description: 'One time meal a family of 6.',
      id: 'one_time_meal',
      price: 1000,
      attribution: 'Photo by Priscilla Du Preez on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 1000
    },
    {
      name: 'Basic medical and hygiene for family',
      description:'Basic medical and hygiene for a family of 6. It includes essential medical and hygiene supplies for men, women and children.',
      id: 'basic_medical_hygiene',
      price: 2000,
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 2000
    },
    {
      name: 'One week ration a family',
      description: 'Provide one week ration to a family.',
      id: 'one_week_ration',
      price: 3500,
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 3500
    },
    {
      name: 'Meal, medical and hygiene for a month for a family',
      id: 'meal_medical_pack',
      description: 'It include food supplies, meals, medical, and hygiene for a month for a family of 6.',
      price: 10000,
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 10000
    },
    {
      name: 'Tent, meal, medical and hygiene for a month for a family',
      id: 'tent_meal_medical',
      description: 'It include food supplies, meals, medical, hygiene and a tent for a family of 6.',
      price: 20000,
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 20000
    },
  ].sort((prev,current) => current.price - prev.price)
}
  export default product
  