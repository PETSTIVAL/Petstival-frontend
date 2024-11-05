import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Food from '../../assets/icons/category/foods.svg?react';
import Clean from '../../assets/icons/category/clean.svg?react';
import Outdoor from '../../assets/icons/category/outdoor.svg?react';
import Toy from '../../assets/icons/category/toy.svg?react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% - 8px);
  margin: 0 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 96px;
  padding: 20px 24px;
  background-color: var(--white);
  color: var(--gray-100);
  border-radius: 8px;
`;

const CategoryButtonWrapper = styled.div`
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

export default function Category() {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <Wrapper>
      <h1 style={{ marginBottom: '8px' }}>카테고리</h1>
      <Container className="drop-shadow-default">
        <CategoryButtonWrapper onClick={() => handleNavigate('사료/간식')}>
          <Food />
          <div>사료/간식</div>
        </CategoryButtonWrapper>
        <CategoryButtonWrapper onClick={() => handleNavigate('위생/배변')}>
          <Clean />
          <div>위생/배변</div>
        </CategoryButtonWrapper>

        <CategoryButtonWrapper onClick={() => handleNavigate('의류')}>
          <Outdoor />
          <div>의류</div>
        </CategoryButtonWrapper>
        <CategoryButtonWrapper onClick={() => handleNavigate('장난감')}>
          <Toy />
          <div>장난감</div>
        </CategoryButtonWrapper>
      </Container>
    </Wrapper>
  );
}
