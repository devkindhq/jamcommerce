import { Stack } from '@chakra-ui/react'
import { Product } from 'use-shopping-cart/core'
import products from '../data/donation_products'
import DonationCard from './DonationCard'

type ProductsProps  = {
  handleBuyNow: (product: Product) => void
}

const ProductsNew = ({handleBuyNow}: ProductsProps) => {
// WIP WIP WIP
// const currencies = useContext(AppContext);
//   const cashifyRate = currencies.state.currency_rates.reduce( (prev,next) => {
//     if(!prev[next.code]) prev[next.code] = 0;
//     prev[next.code] = next.value;
//     return prev
// },{});


  return (
      <Stack spacing={4} w="full">
      {products().sort((prev,current) =>  current.price - prev.price ?? 0).map((product, index) => {
        const donationCardProps = {
          ...product,
          onClick: () => handleBuyNow(product)
        }
         return (<DonationCard key={index} {...donationCardProps} />)
      })}
      </Stack>
  )
}

export default ProductsNew
