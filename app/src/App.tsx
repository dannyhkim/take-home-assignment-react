import './App.css'
import './fonts.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth-context'
import SignInPage from './pages/login-page'
import ProductsPage from './pages/products-page'
import HomePage from './pages/home-page'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
