import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import { LinearProgress } from '@mui/material';
import ShowMoreButton from '../Common/Button/ShowMoreButton';

const Wrapper = styled.div`
  margin: 48px 4px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  gap: 20px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 172px;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentText = styled.div`
  height: 40px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gray-60);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const PriceText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--secondary-orange-default);
`;

export default function ProductRecommend() {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, [fetchProducts]);

  const filteredProduct = products.filter((product) => product.product_id === '59c0c21e-b22d-4f79-9347-87bdbee66275');

  if (filteredProduct.length === 0) {
    return <LinearProgress />;
  }

  return (
    <Wrapper>
      <Info>
        <h1>펫스티벌 추천 상품</h1>
        <ShowMoreButton title="추천 상품 더보기" onClick={() => navigate('/products/petstival')} />
      </Info>
      <Container className="drop-shadow-default">
        <img
          src={filteredProduct[0].image_url_1}
          alt={filteredProduct[0].product_name}
          style={{ width: '28%', height: '28%', maxWidth: '100px', borderRadius: '8px' }}
        />
        <ContentWrapper>
          <TitleText>{filteredProduct[0].product_name}</TitleText>
          <ContentText>{filteredProduct[0].contents}</ContentText>
          <PriceText>{filteredProduct[0].price.toLocaleString()}원</PriceText>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
