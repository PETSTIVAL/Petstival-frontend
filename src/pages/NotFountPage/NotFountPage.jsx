import styled from 'styled-components';
import PetIcon from '../../assets/icons/profile-pet-gray.svg?react';

const Container = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--gray-60);
`;

const Title = styled.div`
  font-size: 64px;
  font-family: 'NanumSquareNeoExtraBold';
  line-height: 80px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-40);
  text-align: center;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <PetIcon style={{ marginBottom: '36px' }} />
      <Title>404</Title>
      <h1 style={{ marginBottom: '36px' }}>Page Not Found</h1>
      <Content>
        요청하신 페이지를 찾을 수 없어요. <br />
        다른 주소로 다시 시도해주세요.
      </Content>
    </Container>
  );
};

export default NotFoundPage;
