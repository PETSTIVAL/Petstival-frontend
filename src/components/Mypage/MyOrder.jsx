import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import { useAuthStore } from '../../stores/useAuthStore';
import ShowMoreButton from '../Common/Button/ShowMoreButton';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  gap: 8px;
  background-color: #fff;
  border-radius: 8px;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function MyOrder() {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);
  const user = useAuthStore((state) => state.user);

  const getSuccessData = async () => {
    // payment 테이블에서 payment_state가 success인 데이터만 order 테이블의 정보를 날짜순으로 가져옴
    const { data, error } = await supabase
      .from('payment')
      .select('order_id, order(*)')
      .eq('payment_state', 'success')
      .order('created_at', { ascending: false });

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

  return (
    <>
      {successProduct && successProduct.length > 0 && (
        <div>
          <RowWrapper style={{ marginBottom: '12px' }}>
            <h1>최근 구매 내역</h1>
            <ShowMoreButton title="주문 내역 보기" onClick={() => navigate('/mypage/order')} />
          </RowWrapper>
          {successProduct ? (
            successProduct &&
            successProduct.length > 0 && (
              <Container className="drop-shadow-default">
                <RowWrapper>
                  {successProduct[0].order.order_status === 'cancel' ? (
                    <></>
                  ) : (
                    <div style={{ fontSize: '13px', fontWeight: '400', color: 'var(--gray-40)' }}>
                      {new Date(successProduct[0].order.created_at)
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
                    </div>
                  )}
                  <>
                    {successProduct[0].order.order_status === 'cancel' ? (
                      <div style={{ fontSize: '12px', fontWeight: '500', color: '#EA4646' }}>주문 취소</div>
                    ) : (
                      <ShowMoreButton title="주문 상세" onClick={() => navigate(`/mypage/order/detail?order_id=${successProduct[0].order_id}`)} />
                    )}
                  </>
                </RowWrapper>

                <RowWrapper style={{ justifyContent: 'start', gap: '16px' }}>
                  <img
                    src={successProduct[0].order.img_url_1}
                    alt={successProduct[0].order.order_title}
                    style={{ width: '80px', height: '80px', borderRadius: '8px' }}
                  />
                  <div>
                    <div style={{ width: '100%', fontSize: '16px', fontWeight: '500' }}>{successProduct[0].order.order_title}</div>
                    <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{successProduct[0].order.total_count}개</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gray-100)' }}>
                      {successProduct[0].order.total_price.toLocaleString()}원
                    </div>
                  </div>
                </RowWrapper>
              </Container>
            )
          ) : (
            <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </div>
          )}
        </div>
      )}
    </>
  );
}
