import React from 'react';
import PropTypes from 'prop-types';
import BackIcon from '../assets/icons/back.svg?react';
import styled from 'styled-components';

const Header = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 24px 20px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(24, 119, 242, 0.08);
`;

const Back = styled.div``;

const OrderText = styled.div`
  width: calc(100% - 36px);
  margin-right: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
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
