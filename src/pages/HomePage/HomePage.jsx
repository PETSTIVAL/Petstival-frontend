import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import PopularPetstival from '../../components/HomePage/PopularPetstival';
import ProductRecommend from '../../components/HomePage/ProductRecommend';
import Category from '../../components/HomePage/Category';
import Navbar from '../../components/Navbar/Navbar';
import MainPopup from '../../components/HomePage/MainPopup';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100svh;
`;

const Wrapper = styled.section`
  overflow-y: auto;
  height: 100%;
  padding: 0 24px;
  padding-bottom: 24px;
`;

function HomePage() {
  const [showMainPop, setShowMainPop] = useState(false);
  const HOME_VISITED = localStorage.getItem('homeVisited'); // localStorage에 homeVisited 조회

  useEffect(() => {
    const today = new Date();
    const handleMainPop = () => {
      if (HOME_VISITED && HOME_VISITED > today) {
        // 현재 date가 localStorage의 시간보다 크면 return
        return;
      }
      if (!HOME_VISITED || HOME_VISITED < today) {
        // 저장된 date가 없거나 today보다 작다면 popup 노출
        setShowMainPop(true);
      }
    };
    window.setTimeout(handleMainPop, 100); // 0.1초 뒤 실행
  }, [HOME_VISITED]);

  return (
    <div>
      <Container>
        <Header />
        <Wrapper>
          <PopularPetstival />
          <ProductRecommend />
          <Category />
        </Wrapper>
        <Navbar selectedMenu="Home" />
      </Container>
      {/* 팝업창 */}
      {showMainPop && <MainPopup setShowMainPop={setShowMainPop}></MainPopup>}
    </div>
  );
}

export default HomePage;
