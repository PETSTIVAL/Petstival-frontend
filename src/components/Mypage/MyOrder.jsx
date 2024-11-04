import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import image1 from '../../assets/info_image.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import { useAuthStore } from '../../stores/useAuthStore';

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
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

export default function MyOrder() {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);
  const user = useAuthStore((state) => state.user);

  const getSuccessData = async () => {
    // payment 테이블에서 payment_state가 success인 데이터만 order 테이블의 정보를 가져옴
    const { data, error } = await supabase.from('payment').select('order_id, order(*)').eq('payment_state', 'success');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    const filteredData = data?.filter((item) => item.order.user_id === user.id);

    if (filteredData) {
      setSuccessProduct(filteredData);
    }
  };

  useEffect(() => {
    getSuccessData();
  }, []);

  // 위치가 중요함...
  if (!successProduct) {
    return <p>Loading product data...</p>;
  }

  return (
    <>
      {successProduct && successProduct.length > 0 && (
        <>
          <Info>
            <h3>최근 구매 내역</h3>
            <Detail onClick={() => navigate('/mypage/order')}>주문 내역 보기 &gt;</Detail>
          </Info>
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
            <Grid
              item
              container
              sx={{ color: 'text.secondary', marginLeft: '4px', marginBottom: '6px', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Grid item>
                <Typography variant="body2" component="div">
                  {new Date(successProduct[successProduct.length - 1].order.created_at)
                    .toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })
                    .replace(/\.$/, '')}
                  &nbsp; 결제 완료
                </Typography>
              </Grid>

              <Grid item>
                {successProduct[successProduct.length - 1].order.order_status === 'cancel' ? (
                  <Typography sx={{ color: '#EA4646' }}>주문 취소</Typography>
                ) : (
                  <Typography
                    onClick={() => navigate(`/mypage/order/detail?order_id=${successProduct[successProduct.length - 1].order_id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    주문 상세 &gt;
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 100, height: 100 }}>
                  <img
                    src={successProduct[successProduct.length - 1].order.img_url_1}
                    alt={successProduct[successProduct.length - 1].order.order_title}
                    style={{ width: 100, height: 100 }}
                  />
                </ButtonBase>
              </Grid>

              <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                      {successProduct[successProduct.length - 1].order.order_title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {successProduct[successProduct.length - 1].order.total_count}개
                    </Typography>

                    <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                      {successProduct[successProduct.length - 1].order.total_price.toLocaleString()}원
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
