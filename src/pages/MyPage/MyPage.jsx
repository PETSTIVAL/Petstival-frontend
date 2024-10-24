import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import MyProfile from '../../components/Mypage/MyProfile';
import MyOrder from '../../components/Mypage/MyOrder';
import MyAccount from '../../components/Mypage/MyAccount';
import Navbar from '../../components/Navbar/Navbar';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;
// TODO: 최근 구매 내역 1개만 불러오기
function MyPage() {
  return (
    <>
      <Header />
      <Wrapper>
        <MyProfile />
        <MyOrder />
        <MyAccount />
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </>
  );
}

export default MyPage;
