import React from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import { Product } from 'use-shopping-cart/core'
import products from '../data/donation_products'

type ProductsProps  = {
  handleBuyNow: (product: Product) => void
}

const ProductsNew = ({handleBuyNow}: ProductsProps) => {
  return (
    <section className="products">
      {products.map((product, index) => (
        <div key={index} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
        
              <button
              className="cart-style-background"
              onClick={() => {
                handleBuyNow(product)
              }}
            >
              Buy now
            </button>
        
        </div>
      ))}
    </section>
  )
}

export default ProductsNew
