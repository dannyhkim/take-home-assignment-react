import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import axios from 'axios'

interface AuthContextProps {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated')
    return storedAuthState ? JSON.parse(storedAuthState) : false
  })

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:8080/api/authenticate', { email, password })

      const { accessToken, refreshToken } = res.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', JSON.stringify(true))
    } catch (err) {
      console.error('Login failed:', err.message)
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  const refreshSession = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/refresh', {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      })

      const { accessToken, refreshToken } = res.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    } catch (err) {
      console.error('Error refreshing session:', err.message)
      throw new Error('Session refresh failed')
    }
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem('isAuthenticated')
    }
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshSession }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
