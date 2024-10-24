import React from 'react';
import styled from 'styled-components';
import OrderList from '../../../components/Mypage/OrderPage/OrderList';
import Navbar from '../../../components/Navbar/Navbar';
import image1 from '../../../assets/info_image.png';
import { useNavigate } from "react-router-dom";
import DetailBar from "../../../stories/DetailBar";

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

const itemData = [
  {
    img: image1,
    title: '강아지와 함께하는 피크닉 세트',
    amount: '1',
    price: 39800,
    dateTime: '2024.10.23 01:17',
    status: '결제 완료',
  },
  {
    img: image1,
    title: '강아지와 함께하는 물놀이 세트',
    amount: '1',
    price: 39800,
    dateTime: '2024.10.23 01:17',
    status: '결제 완료',
  },

  {
    img: image1,
    title: '강아지와 함께하는 피크닉 세트',
    amount: '2',
    price: 39800,
    dateTime: '2024.10.22 01:17',
    status: '결제 완료',
  },
  {
    img: image1,
    title: '강아지와 함께하는 물놀이 세트',
    amount: '2',
    price: 39800,
    dateTime: '2024.10.22 01:17',
    status: '결제 완료',
  },
];

// 아이템 데이터를 날짜별로 그룹화하는 함수
const groupItemsByDate = (items) => {
  return items.reduce((acc, item) => {
    const date = item.dateTime.split(' ')[0]; // 날짜만 추출
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
const groupedItems = groupItemsByDate(itemData);

function OrderPage() {
  const navigate = useNavigate();

  return (
    <>
      <DetailBar title="주문 내역"/>

      <Wrapper>
        {Object.keys(groupedItems).map((date) => (
          <div key={date}>
            <Info>
              <h3>{date}</h3>
              <Detail onClick={() => navigate("/mypage/order/detail")}>주문 상세 &gt;</Detail>
            </Info>
            {groupedItems[date].map((item, index) => (
              <OrderList key={index} item={item} />
            ))}
          </div>
        ))}
      </Wrapper>
      <Navbar />
    </>
  );
}

export default OrderPage;
