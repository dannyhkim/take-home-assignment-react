import React, { ReactNode, ChangeEvent } from 'react'
import styled from 'styled-components'

type InputType  = "text" | "email" | "password" | "url"

interface InputProps {
  type?: InputType
  label: ReactNode
  value: string
  onChange(value: string): void
}

const InputContainer = styled.div`
  margin-bottom: 24px;
`

const InputLabel = styled.label`
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  line-height: 24px;
  margin-bottom: 16px;
`

const InputField = styled.input`
  height: 40px;
  width: 100%;
  background: #fff;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-family: 'Source Sans Pro';
  font-weight: 400;
  font-size: 14px;
  color: #000;
  line-height: 24px;
  padding-left: 16px;
  box-sizing: border-box;
`

const Input: React.FC<InputProps> = ({ label, onChange, ...inputProps }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputField {...inputProps} onChange={handleChange} />
    </InputContainer>
  )
}

export default Input
