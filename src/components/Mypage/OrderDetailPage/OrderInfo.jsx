import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function OrderInfo() {
  return (
    <>
      <h3>주문 정보</h3>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '15px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Typography gutterBottom variant="subtitle3" component="div" sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '20px' }}>
          No. 0000001
        </Typography>
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px' }}>
          <Typography variant="body2" component="div">
            2024.10.23 01:17 &nbsp;
          </Typography>
          <Typography variant="body2" component="div">
            결제 완료
          </Typography>
        </Grid>
      </Paper>
    </>
  );
}
