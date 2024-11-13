import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import DeliveryInfo from '../../components/PaymentsPage/DeliveryInfo';
import DetailBar from '../../stories/DetailBar';
import OrderInfo from '../../components/PaymentsPage/OrderInfo';
import { useLocation } from 'react-router-dom';
import useDeliveryStore from '../../stores/useDeliveryStore';
import useTotalStore from '../../stores/useTotalStore';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  height: calc(100% - 160px); // 전체 높이에서 Header, ShopTabBar, Navbar 높이 제외
  overflow-y: auto;
  /* padding: 24px 20px; */
`;

function PaymentsPage() {
  const location = useLocation();
  const {
    delivery_name = '', // 기본값 설정
    delivery_tel = '',
    delivery_addr = '',
    delivery_addr_detail = '',
    total_count = 1,
    total_price = 0,
    product_price = 0,
  } = location.state || {};

  const { setName, setNumber, setAddress, setDetailAddress } = useDeliveryStore();
  const { setQuantity, setUnitPrice } = useTotalStore();

  useEffect(() => {
    if (location.state) {
      setName(delivery_name);
      setNumber(delivery_tel);
      setAddress(delivery_addr);
      setDetailAddress(delivery_addr_detail);
      setQuantity(total_count);
      setUnitPrice(product_price);
    }
  }, [
    delivery_name,
    delivery_tel,
    delivery_addr,
    delivery_addr_detail,
    total_count,
    product_price,
    setName,
    setNumber,
    setAddress,
    setDetailAddress,
    setQuantity,
    setUnitPrice,
  ]);

  return (
    <Container>
      <DetailBar title="주문하기" />
      <Wrapper>
        <DeliveryInfo />
        <OrderInfo />
      </Wrapper>
      <Navbar selectedMenu="Shop" />
    </Container>
  );
}

export default PaymentsPage;
