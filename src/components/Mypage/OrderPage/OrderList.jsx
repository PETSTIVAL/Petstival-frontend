import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';
import supabase from '../../../services/supabaseClient';
import { useOrderItemStore } from '../../../stores/useOrderItemStore';

const ReorderButton = styled.button`
  position: absolute;
  right: 40px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function OrderList({ item }) {
  const navigate = useNavigate();
  const addOrderItem = useOrderItemStore((state) => state.addOrderItem);

  const handleReorder = async (order) => {
    try {
      const { data, error } = await supabase.from('order_detail').select().eq('order_id', item.order_id);
      if (error) throw error;

      const orderItems = data.map((item) => {
        return {
          productId: item.product_id,
          unitPrice: item.price / item.count,
          quantity: item.count,
          totalPrice: item.price,
        };
      });

      addOrderItem(orderItems);
      navigate(`/order`);
    } catch (error) {
      throw error;
    }
  };

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
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Grid item container sx={{ color: 'text.secondary', marginLeft: '4px', marginBottom: '6px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item>
            <Typography variant="body2" component="div">
              {new Date(item.order.created_at)
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
            {item.order.order_status === 'cancel' ? (
              <Typography sx={{ color: '#EA4646' }}>주문 취소</Typography>
            ) : (
              <Typography onClick={() => navigate(`/mypage/order/detail?order_id=${item.order_id}`)} sx={{ cursor: 'pointer' }}>
                주문 상세 &gt;
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <img src={item.order.img_url_1} alt={item.order.order_title} style={{ width: 100, height: 100 }} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container sx={{ marginTop: '10px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {item.order.order_title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.order.total_count}개
                </Typography>

                {item.order.order_status === 'cancel' && <ReorderButton onClick={() => handleReorder(item.order)}>재주문하기</ReorderButton>}
                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{item.order.total_price.toLocaleString()}원</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
