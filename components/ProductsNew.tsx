import { Stack } from '@chakra-ui/react'
import React from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import { Product } from 'use-shopping-cart/core'
import products from '../data/donation_products'
import DonationCard from './DonationCard'

type ProductsProps  = {
  handleBuyNow: (product: Product) => void
}

const ProductsNew = ({handleBuyNow}: ProductsProps) => {
  return (
      <Stack spacing={4} w="full">
      {products.map((product, index) => {
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
