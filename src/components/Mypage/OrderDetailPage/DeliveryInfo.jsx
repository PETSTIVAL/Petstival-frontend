import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function DeliveryInfo(props) {
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
          {props.delivery_name}
        </Typography>
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px', flexDirection: 'column'}}>
          <Typography variant="body2" component="div">
            {props.delivery_addr} {props.delivery_addr_detail}
          </Typography>
          <Typography variant="body2" component="div">
            {props.delivery_tel}
          </Typography>
        </Grid>
      </Paper>
    </>
  );
}
