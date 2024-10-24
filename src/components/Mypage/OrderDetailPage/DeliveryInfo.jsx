import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function DeliveryInfo() {
  return (
    <>
      <h3>배송지 정보</h3>
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
          김다연
        </Typography>
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px', flexDirection: 'column'}}>
          <Typography variant="body2" component="div">
            서울시 중구 마른내로 159-4
          </Typography>
          <Typography variant="body2" component="div">
            010-1234-2134
          </Typography>
        </Grid>
      </Paper>
    </>
  );
}
