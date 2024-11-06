import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useDeliveryStore from '../../stores/useDeliveryStore';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderItemStore } from '../../stores/useOrderItemStore';
import supabase from '../../services/supabaseClient';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 32px;
  background-color: #fff;
  margin: 24px 0;
`;

const Button = styled.button`
  width: calc(100% - 48px);
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${({ $sub }) => ($sub === 'secondary' ? '500' : '700')};
  background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-bright)' : 'var(--primary-default)')};
  color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--gray-100)' : 'var(--white)')};
  border: ${({ $sub }) => ($sub === 'secondary' ? '1px solid var(--primary-light)' : '')};
  &:active {
    background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-light)' : 'var(--primary-darken)')};
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

export default function OrderInfo() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(null);
  const { user } = useAuthStore();
  const { fetchProducts, getProductById } = useProductStore();
  const { name, number, address, detailAddress } = useDeliveryStore();
  const orderItems = useOrderItemStore((state) => state.orderItems);
  const orderTotal = useOrderItemStore((state) => state.orderTotal);
  const [isLoaded, setIsLoaded] = useState(false);
  /**
   * [ ] useTotalStore 파일 및 관련 코드 삭제
   */

  // 모든 필드가 채워졌는지 확인
  const isFormComplete = name && number && address && detailAddress;

  const loadProduct = async () => {
    await fetchProducts();
    const orderItemProducts = orderItems.map((item) => {
      return {
        info: getProductById(item.productId),
        item: item,
      };
    });
    setProductList(orderItemProducts);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    if (productList) setIsLoaded(true);
  }, [productList]);

  const handlePayment = async () => {
    const orderTitle = `${productList[0].info.product_name}${productList.length > 1 ? ` 외 ${productList.length - 1}건` : ''}`;

    // order table에 주문 데이터 삽입
    const dataToPost = {
      user_id: user.id,
      delivery_name: name,
      delivery_tel: number,
      delivery_addr: address,
      delivery_addr_detail: detailAddress,
      total_price: orderTotal, // totalPrice -> orderTotal(useOrderItemStore)로 변경
      total_count: orderItems.length, // quantity -> orderItems.length(주문한 항목 수)로 변경
      order_title: orderTitle,
      img_url_1: productList[0].info.image_url_1,
    };

    const { data: insertData, error: insertError } = await supabase.from('order').insert([dataToPost]).select();

    if (insertError) {
      console.error('Error posting data:', insertError);
      return;
    }

    // insertData에서 order_id 가져오기
    const newOrderId = insertData[0].order_id;

    // order_detail table에 주문 상세 데이터 삽입 -> 배열로 변경
    const orderDetailPost = productList.map((product) => {
      return {
        order_id: newOrderId,
        product_id: product.item.productId,
        count: product.item.quantity,
        price: product.item.totalPrice,
      };
    });

    const { data: detailData, error: detailError } = await supabase.from('order_detail').insert(orderDetailPost);

    if (detailError) {
      console.error('Error posting data:', detailError);
      return;
    }

    navigate(`/payment?order_id=${newOrderId}`, {
      // CheckoutPage로 주문 정보 전달
      state: { orderName: orderTitle, customerName: name, customerEmail: user.email, customerNumber: number },
    });
  };

  const { orderName, customerName, customerEmail } = location.state || {};

  // 위치가 중요함...
  if (!productList) {
    return <p>Loading product data...</p>;
  }

  return (
    <>
      <Container className="drop-shadow-default">
        <h2>주문 상품</h2>
        {isLoaded ? productList.map((product, index) => <OrderItem key={index} product={product} totalPrice={orderTotal} />) : <div>Loading</div>}

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>총 주문 금액</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--secondary-orange-default)' }}>{orderTotal.toLocaleString()}원</div>
        </div>
      </Container>
      <Button onClick={handlePayment} disabled={!isFormComplete}>
        {isFormComplete ? '결제하기' : '배송지를 입력해주세요'}
      </Button>
    </>
  );
}
