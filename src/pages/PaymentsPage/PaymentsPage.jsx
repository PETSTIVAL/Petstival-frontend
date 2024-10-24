import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import DeliveryInfo from "../../components/Mypage/OrderDetailPage/DeliveryInfo";
import DetailBar from "../../stories/DetailBar";
import OrderInfo from '../../components/PaymentsPage/OrderInfo';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;


function PaymentsPage() {
  return (
    <>
      <DetailBar title="주문하기"/>
      <Wrapper>
        <DeliveryInfo />
        <OrderInfo />
      </Wrapper>
      <Navbar />
    </>
  );
}

export default PaymentsPage;
