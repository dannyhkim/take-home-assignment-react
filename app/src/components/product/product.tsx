import React from 'react'
import styled from 'styled-components'

interface ProductProps {
  product: {
    id: number
    title: string
    description: string
    price: number
    currency: string
  }
}

const ProductContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-family: 'Source Sans Pro';
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  line-height: 40px;
  margin: 5px 0 0 0;
`

const Description = styled.p`
  font-family: 'Source Sans Pro';
  font-weight: 400;
  font-size: 16px;
  color: #858484;
  line-height: 24px;
`

const Price = styled.p`
  font-family: 'Source Sans Pro';
  font-weight: bold;
`

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <ProductContainer key={product.id}>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>
        Price: {product.price} {product.currency}
      </Price>
    </ProductContainer>
  )
}

export default Product
