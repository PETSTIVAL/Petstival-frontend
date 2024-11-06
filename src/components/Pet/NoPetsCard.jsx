import styled from 'styled-components';
import PetProfileGray from '../../assets/icons/profile-pet-gray.svg?react';

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-40);
  background-color: var(--gray-20);
  border-radius: 12px;
`;

function NoPetsCard({ content }) {
  return (
    <Container>
      <PetProfileGray />
      <div>{content}</div>
    </Container>
  );
}

export default NoPetsCard;
