import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar/Navbar';
import OrderId from '../../../components/Mypage/OrderDetailPage/OrderId';
import ProductInfo from '../../../components/Mypage/OrderDetailPage/ProductInfo';
import DeliveryInfo from '../../../components/Mypage/OrderDetailPage/DeliveryInfo';
import DetailBar from '../../../stories/DetailBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../../../services/supabaseClient';
import { Button } from '@mui/material';
import YesNoModal from '../../../components/Common/Modal/DefaultModal';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function OrderDetailPage() {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [product, setProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const getProductData = async () => {
    // payment 테이블에서 payment_state가 success이고 order_id가 일치하는 데이터만 가져옴
    const { data, error } = await supabase.from('payment').select('order_id, order(*)').eq('payment_state', 'success').eq('order_id', order_id).single(); // 일치하는 정보 1개만 가져옴
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    if (data) {
      setProduct(data);
    }
  };

  const navigate = useNavigate();

  async function handleCancel() {
    setIsConfirmModalOpen(true);
    cancelOrder();
  }

  async function cancelOrder() {
    try {
      const { error } = await supabase
        .from('order')
        .update({ order_status: 'cancel' })
        .eq('order_id', order_id);

      if (error) {
        console.error('Error deleting order:', error);
        return;
      }

    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  // useEffect(() => {
  //   if (product) {
  //     console.log("Success Product:", product);
  //   }
  // }, [product]);

  // 위치가 중요함...
  if (!product) {
    return <p>Loading product data...</p>;
  }

  return (
    <>
      <DetailBar title="주문 상세" />
      <Wrapper>
        <OrderId order_id={order_id} created_at={product.order.created_at} />
        <ProductInfo
          created_at={product.order.created_at}
          img_url_1={product.order.img_url_1}
          product_name={product.order.product_name}
          total_count={product.order.total_count}
          total_price={product.order.total_price}
        />
        <DeliveryInfo
          delivery_name={product.order.delivery_name}
          delivery_tel={product.order.delivery_tel}
          delivery_addr={product.order.delivery_addr}
          delivery_addr_detail={product.order.delivery_addr_detail}
        />
        <Button
          onClick={handleCancel}
          variant="contained"
          size="large"
          sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)', marginBottom: '15px' }}
        >
          주문 취소하기
        </Button>
        <YesNoModal
          title={`주문 취소 확인`}
          content={`정말 주문 취소 하시겠어요?`}
          isOpen={isConfirmModalOpen}
          setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
          onYesClick={() => {
            window.location.href = '/mypage/order';
          }}
        />
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </>
  );
}

export default OrderDetailPage;
