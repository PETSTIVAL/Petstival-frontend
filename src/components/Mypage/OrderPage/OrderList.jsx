import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';
import supabase from '../../../services/supabaseClient';
import { useOrderItemStore } from '../../../stores/useOrderItemStore';
import ShowMoreButton from '../../Common/Button/ShowMoreButton';

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

const ReorderButton = styled.button`
  position: absolute;
  right: 40px;
  display: flex;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${({ $sub }) => ($sub === 'secondary' ? '500' : '700')};
  background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-light)' : 'var(--primary-default)')};
  color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--gray-100)' : 'var(--white)')};
  word-break: keep-all;
  cursor: pointer;

  &:active {
    background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-medium)' : 'var(--primary-darken)')};
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

export default function OrderList({ item }) {
  const navigate = useNavigate();
  const addOrderItem = useOrderItemStore((state) => state.addOrderItem);

  const handleReorder = async () => {
    try {
      // order_detail 테이블에서 주문 항목 정보 가져오기
      const { data: orderDetails, error: orderDetailError } = await supabase.from('order_detail').select().eq('order_id', item.order_id);
      if (orderDetailError) throw orderDetailError;

      // order 테이블에서 배송지 및 주문 정보 가져오기
      const { data: orderInfo, error: orderInfoError } = await supabase
        .from('order')
        .select('delivery_name, delivery_tel, delivery_addr, delivery_addr_detail, total_count, total_price')
        .eq('order_id', item.order_id)
        .single();
      if (orderInfoError) throw orderInfoError;

      // 주문 항목을 전역 상태에 추가
      const orderItems = orderDetails.map((detail) => ({
        productId: detail.product_id,
        unitPrice: detail.price / detail.count,
        quantity: detail.count,
        totalPrice: detail.price,
      }));
      addOrderItem(orderItems);

      // 배송지 정보를 포함하여 PaymentsPage로 이동
      navigate(`/order`, {
        state: {
          delivery_name: orderInfo.delivery_name,
          delivery_tel: orderInfo.delivery_tel,
          delivery_addr: orderInfo.delivery_addr,
          delivery_addr_detail: orderInfo.delivery_addr_detail,
          total_count: orderInfo.total_count,
          product_price: orderInfo.total_price,
        },
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  return (
    <Container className="drop-shadow-default">
      <RowWrapper style={{ marginBottom: '4px' }}>
        {item.order.order_status === 'cancel' ? (
          <div style={{ fontSize: '13px', fontWeight: '500', color: '#EA4646' }}>주문 취소</div>
        ) : (
          <div style={{ fontSize: '13px', fontWeight: '400', color: 'var(--gray-40)' }}>
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
          </div>
        )}
        {item.order.order_status === 'cancel' ? (
          <ShowMoreButton title="다시 주문하기" onClick={handleReorder} />
        ) : (
          <ShowMoreButton title="주문 상세" onClick={() => navigate(`/mypage/order/detail?order_id=${item.order_id}`)} />
        )}
      </RowWrapper>

      <RowWrapper style={{ justifyContent: 'start', gap: '16px' }}>
        <img src={item.order.img_url_1} alt={item.order.order_title} style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
        <div>
          <div style={{ width: '100%', fontSize: '16px', fontWeight: '500' }}>{item.order.order_title}</div>
          <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{item.order.total_count}개</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gray-100)' }}>{item.order.total_price.toLocaleString()}원</div>
        </div>
      </RowWrapper>
    </Container>
  );
}
