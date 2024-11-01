import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Food from '../../assets/icons/category/foods.svg?react';
import Clean from '../../assets/icons/category/clean.svg?react';
import Outdoor from '../../assets/icons/category/outdoor.svg?react';
import Toy from '../../assets/icons/category/toy.svg?react';

export default function Category() {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <h3>카테고리</h3>

      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        <Grid container spacing={10}>
          <Grid item onClick={() => handleNavigate('사료/간식')}>
            <Grid item xs container direction="column" alignItems="center">
              <Food />
              <Typography variant="button" sx={{ display: 'block' }}>
                사료/간식
              </Typography>
            </Grid>
          </Grid>

          <Grid item onClick={() => handleNavigate('위생/배변')}>
            <Grid item xs container direction="column" alignItems="center">
              <Clean />
              <Typography variant="button" sx={{ display: 'block' }}>
                위생/배변
              </Typography>
            </Grid>
          </Grid>

          <Grid item onClick={() => handleNavigate('의류')}>
            <Grid item xs container direction="column" alignItems="center">
              <Outdoor />
              <Typography variant="button" sx={{ display: 'block' }}>
                의류
              </Typography>
            </Grid>
          </Grid>

          <Grid item onClick={() => handleNavigate('장난감')}>
            <Grid item xs container direction="column" alignItems="center">
              <Toy />
              <Typography variant="button" sx={{ display: 'block' }}>
                장난감
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}