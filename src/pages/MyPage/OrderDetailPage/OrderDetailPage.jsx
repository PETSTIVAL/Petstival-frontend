import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar/Navbar';
import OrderId from '../../../components/Mypage/OrderDetailPage/OrderId';
import ProductInfo from '../../../components/Mypage/OrderDetailPage/ProductInfo';
import DeliveryInfo from '../../../components/Mypage/OrderDetailPage/DeliveryInfo';
import DetailBar from '../../../stories/DetailBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../../../services/supabaseClient';
import YesNoModal from '../../../components/Common/Modal/DefaultModal';
import { LinearProgress } from '@mui/material';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100svh;
`;

const Wrapper = styled.section`
  overflow-y: auto;
  height: 100%;
  padding: 24px;
  padding-bottom: 48px;
`;

const OrderProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  bottom: 48px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--primary-default);
  color: var(--white);
  cursor: pointer;

  &:active {
    background-color: var(--primary-darken);
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

function OrderDetailPage() {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [product, setProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [orderItem, setOrderItem] = useState([]);

  const getProductData = async () => {
    // payment 테이블에서 payment_state가 success이고 order_id가 일치하는 데이터만 가져옴
    const { data, error } = await supabase
      .from('payment')
      .select('order_id, payment_key, order(*)')
      .eq('payment_state', 'success')
      .eq('order_id', order_id)
      .single();
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      setProduct(data);
    }
  };

  const getOrderItemData = async () => {
    const { data, error } = await supabase
      .from('order_detail')
      .select(
        `
        *,
        product (
          product_name,
          image_url_1
        )
      `
      )
      .eq('order_id', order_id);

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      setOrderItem(data);
    }
  };

  async function cancelOrder() {
    try {
      const { error } = await supabase.from('order').update({ order_status: 'cancel' }).eq('order_id', order_id);
      cancelPayment();
      if (error) {
        console.error('Error deleting order:', error);
        return;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  async function cancelPayment() {
    const response = await fetch('https://hfnchwvpqruwmlehusbs.supabase.co/functions/v1/payment-cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey: product.payment_key,
      }),
    });
    const data = await response.json();
    console.log(data);
    window.location.href = '/mypage/order';
  }

  async function handleCancel() {
    setIsConfirmModalOpen(true);
  }

  useEffect(() => {
    getProductData();
    getOrderItemData();
  }, []);

  if (!product) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <DetailBar title="주문 상세" />
      <Wrapper>
        <OrderId order_id={product.order.order_title} created_at={product.order.created_at} />
        <h2 style={{ marginBottom: '8px' }}>주문 내역</h2>
        <OrderProductWrapper>
          {orderItem.map((item) => {
            return (
              <ProductInfo
                key={item.product_id}
                created_at={product.order.created_at}
                img_url_1={item.product.image_url_1}
                product_name={item.product.product_name}
                total_count={item.count}
                total_price={item.price}
              />
            );
          })}
        </OrderProductWrapper>
        <DeliveryInfo
          delivery_name={product.order.delivery_name}
          delivery_tel={product.order.delivery_tel}
          delivery_addr={product.order.delivery_addr}
          delivery_addr_detail={product.order.delivery_addr_detail}
        />
        <YesNoModal
          title={`주문 취소 확인`}
          content={`정말 주문 취소 하시겠어요?`}
          isOpen={isConfirmModalOpen}
          setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
          onYesClick={() => cancelOrder()}
        />
        <Button onClick={handleCancel}>주문 취소하기</Button>
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </Container>
  );
}

export default OrderDetailPage;
