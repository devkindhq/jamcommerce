import { Product as Prod } from 'use-shopping-cart';

export interface Product extends Prod { 
  name: string,
  description?: string | undefined,
  id: string
  price: number
  image: string
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
      image:
        'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
      attribution: 'Photo by Priscilla Du Preez on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 400
    },
    {
      name: 'Basic medical and hygiene for family',
      description:'Basic medical and hygiene for a family of 6. It includes essential medical and hygiene supplies for men, women and children.',
      id: 'basic_medical_hygiene',
      price: 2000,
      image:
        'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 400
    },
    {
      name: 'One week ration a family',
      description: 'Provide one week ration to a family.',
      id: 'one_week_ration',
      price: 3500,
      image:
        'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 400
    },
    {
      name: 'Meal, medical and hygiene for a month for a family',
      id: 'meal_medical_pack',
      description: 'It include food supplies, meals, medical, and hygiene for a month for a family of 6.',
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 400
    },
    {
      name: 'Tent, meal, medical and hygiene for a month for a family',
      id: 'tent_meal_medical',
      description: 'It include food supplies, meals, medical, hygiene and a tent for a family of 6.',
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
      attribution: 'Photo by Jonathan Pielmayer on Unsplash',
      currency: 'USD',
      base_currency: 'AUD',
      base_price: 400
    },
  ]
}
  export default product
  