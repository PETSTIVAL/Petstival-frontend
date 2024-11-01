import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

export default function ProductInfo(props) {
  return (
    <>
      <h3>주문 내역</h3>

      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '4px', marginBottom: '6px' }}>
          <Typography variant="body2" component="div">
            {new Date(props.created_at)
              .toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
              .replace(/\.$/, '')}
            &nbsp; &nbsp;
          </Typography>
          <Typography variant="body2" component="div">
            결제 완료
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <img
                src={props.img_url_1}
                alt={props.product_name}
                style={{ width: 100, height: 100 }}
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {props.product_name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {props.total_count}개
                </Typography>

                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {props.total_price.toLocaleString()}원
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
