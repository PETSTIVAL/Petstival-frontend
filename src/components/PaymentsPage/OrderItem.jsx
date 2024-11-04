import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const OrderItem = ({ product }) => {
  return (
    <>
      {product && (
        <Grid container spacing={2}>
          <Grid item>
            <img
              src={product.info.image_url_1}
              alt={product.info.product_name}
              style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={8} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {product.info.product_name}
                </Typography>
                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.item.quantity}개</Typography>
                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.info.price.toLocaleString()}원</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrderItem;
