import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

export default function OrderList({ item }) {
  return (
    <>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: "8px",
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)'
        })}
      >
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px' }}>
          <Typography variant="body2" component="div">
            {item.dateTime} &nbsp;
          </Typography>
          <Typography variant="body2" component="div">
            {item.status}
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <img alt={item.title} src={item.img} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.amount}개
                </Typography>

                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {item.price}원
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
