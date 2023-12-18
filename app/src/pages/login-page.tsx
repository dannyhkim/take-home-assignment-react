import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/input/input'
import logo from '../assets/Logo.png'
import { useAuth } from '../auth/auth-context'
import { SignInContainer, Header, SubHeader, BodyText, Logo, SignInButton } from './styled'

const SignInPage: React.FC = () => {
  const { login, isAuthenticated, refreshSession } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
      navigate('/products')
    } catch (err) {
      console.error('Login error:', err.message)
    }
  }

  // handle when session expires
  useEffect(() => {
    const handleSessionExpiration = async () => {
      try {
        if (isAuthenticated) {
          await refreshSession()
        }
      } catch (err) {
        console.error('Session refresh failed:', err.message)
        navigate('/login')
      }
    }

    handleSessionExpiration()
  }, [isAuthenticated, navigate, refreshSession])

  return (
    <>
      <SignInContainer>
        <Logo src={logo} alt="Logo" />
        <Header>Sign in</Header>
        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={value => handleInputChange('email', value)}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={value => handleInputChange('password', value)}
          />
          <SignInButton>Sign in</SignInButton>
        </form>
        <SubHeader>Forgot password?</SubHeader>
      </SignInContainer>
      <BodyText>
        ©2001–2019 All Rights Reserved. Clip® is a registered trademark of Rover Labs. Cookie Preferences, Privacy, and
        Terms.
      </BodyText>
    </>
  )
}

export default SignInPage
