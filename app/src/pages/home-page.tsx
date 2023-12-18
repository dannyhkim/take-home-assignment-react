// home-page.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, Header } from './styled';

const GoToLoginButton = styled(Link)`
  background-color: #9a48d6;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Header>Home Page</Header>
      <GoToLoginButton to="/login">Go to Login</GoToLoginButton>
    </PageContainer>
  );
};

export default HomePage;
