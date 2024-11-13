import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from './OrderItem.module.css';
import * as React from 'react';

const OrderItem = ({ product }) => {
  return (
    <>
      {product && (
        // <Grid container spacing={2}>
        //   <Grid item>
        //     <img
        //       src={product.info.image_url_1}
        //       alt={product.info.product_name}
        //       style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
        //     />
        //   </Grid>
        //   <Grid item xs={8} sm container sx={{ marginTop: '10px' }}>
        //     <Grid item xs container direction="column" spacing={2}>
        //       <Grid item xs>
        //         <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
        //           {product.info.product_name}
        //         </Typography>
        //         <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.item.quantity}개</Typography>
        //         <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{product.info.price.toLocaleString()}원</Typography>
        //       </Grid>
        //     </Grid>
        //   </Grid>
        // </Grid>
        <div className={styles.wrapper}>
          <div className={styles.rowWrapper}>
            <div className={styles.contentWrapper}>
              {/* 상품 이미지 */}
              <img className={styles.imageContainer} src={product.info.image_url_1 || '/default-image.png'} />
              {/* 상품 정보 */}
              <div>
                <div className={styles.titleText}>{product.info.product_name || '상품명'}</div> {/* 상품명을 표시 */}
                <div className={styles.quantityText}>{product.item.quantity}개</div>
                <div className={styles.priceText}>{product.info.price.toLocaleString()}원</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
