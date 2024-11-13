import styled from 'styled-components';
import AngleRight from '../../../assets/icons/angle-right.svg?react';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: end;
  color: var(--gray-60);
  font-size: 14px;
  cursor: pointer;
`;

const ShowMoreButton = ({ title, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      {title}
      <AngleRight />
    </ButtonWrapper>
  );
};

export default ShowMoreButton;
