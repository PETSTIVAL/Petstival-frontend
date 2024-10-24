import React from 'react';
import PropTypes from 'prop-types';
import BackIcon from '../assets/icons/back.svg?react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(24, 119, 242, 0.08);
`;

const Back = styled.div`
  margin-left: 30px;
`;

const OrderText = styled.div`
  flex: 1;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
`;

const DetailBar = ({ title, onBack }) => {
  const handleBack = () => {
    window.history.back(); // 뒤로가기 로직
  };

  return (
    <Header>
      <Back onClick={onBack || handleBack}>
        <BackIcon />
      </Back>
      <OrderText>{title}</OrderText>
    </Header>
  );
};

// PropTypes 정의
DetailBar.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func, // onBack prop 추가
};

export default DetailBar;