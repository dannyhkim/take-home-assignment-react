import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth-context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Product from '../components/product/product'
import styled from 'styled-components'
import { Header, PageContainer } from './styled'

interface ApiProduct {
  id: number
  title: string
  description: string
  price: number
  currency: string
}

const LogoutButton = styled.button`
  background-color: #9a48d6;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`

const ProductsPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      setProducts(response.data)
    } catch (err) {
      console.error('Error fetching products:', err.message)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      fetchProducts()
    }
  }, [isAuthenticated, navigate])

  return (
    <PageContainer>
      {isAuthenticated && (
        <>
          <Header>Products Page</Header>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
          <div>
            {products.map((product: ApiProduct) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </PageContainer>
  )
}

export default ProductsPage
