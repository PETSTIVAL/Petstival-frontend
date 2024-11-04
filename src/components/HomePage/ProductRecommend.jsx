import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import image1 from '../../assets/info_image.png';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useProductStore } from '../../stores/useProductStore';
import { LinearProgress } from '@mui/material';

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Detail = styled.div`
  color: var(--gray-gray-60, #838283);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
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

  const filteredProduct = products.filter((product) =>
    product.product_id === "59c0c21e-b22d-4f79-9347-87bdbee66275"
  );

  if (filteredProduct.length === 0) {
    return <LinearProgress />;
  }

  return (
    <>
      <Info>
        <h3>펫스티벌 추천 상품</h3>
        <Detail onClick={() => navigate('/products/petstival')}>추천 상품 더보기 &gt;</Detail>
      </Info>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: "8px",
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        <Grid container spacing={2} onClick={() => navigate(`/products/${filteredProduct[0].product_id}`)}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <img src={filteredProduct[0].image_url_1} alt={filteredProduct[0].product_name} style={{ width: 100, height: 100 }} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {filteredProduct[0].product_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {filteredProduct[0].content}
                </Typography>
                <Typography sx={{ cursor: 'pointer', color: 'var(--secondary-orange-default)', fontWeight: 'bold' }}>
                  {filteredProduct[0].price.toLocaleString()}원
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
