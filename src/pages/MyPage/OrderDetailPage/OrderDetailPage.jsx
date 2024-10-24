import React from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar/Navbar';
import OrderInfo from "../../../components/Mypage/OrderDetailPage/OrderInfo";
import MyOrder from '../../../components/Mypage/MyOrder';
import DeliveryInfo from "../../../components/Mypage/OrderDetailPage/DeliveryInfo";
import DetailBar from "../../../stories/DetailBar";

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;


function OrderDetailPage() {

   // TODO: 해당 날짜 아이템만 가져오기
   // TODO: 해당 날짜 아이템만 토대로 주문 내역 컴포넌트 다시 만들기 (현재 임시 컴포넌트)
  return (
    <>
      <DetailBar title="주문 상세"/>

      <Wrapper>
        <OrderInfo />
        <MyOrder />
        <DeliveryInfo />
      </Wrapper>
      <Navbar />
    </>
  );
}

export default OrderDetailPage;
