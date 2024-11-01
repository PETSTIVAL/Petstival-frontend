import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ShopTabBar from '../../components/ProductList/ShopTabBar';
import ProductItem from '../../components/ProductList/ProductItem';
import styles from './ProductListPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useProductStore } from '../../stores/useProductStore';
import { LinearProgress } from '@mui/material';

const Wrapper = styled.section`
  padding: 24px;
`;

const ProductListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체'); // 기본 탭은 '전체'로 설정
  const { products, fetchProducts } = useProductStore();
  
  const fetchData = async () => {
    await fetchProducts(); // 비동기 함수 호출
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 쿼리 매개변수로 전달된 카테고리를 읽어와 activeTab을 설정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveTab(category); // 쿼리 매개변수를 통해 activeTab 설정
    }
  }, [location.search]);

  // 탭을 전환할 때 URL의 쿼리 매개변수를 업데이트
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/products?category=${tab}`); // URL 쿼리 매개변수 업데이트
  };

  // 선택된 탭에 따라 제품을 필터링
  const filteredProducts = products.filter((product) => {
    if (activeTab === '전체') return true; // 모든 제품 반환
    if (activeTab === '사료/간식') return product.category_id === 1;
    if (activeTab === '위생/배변') return product.category_id === 2;
    if (activeTab === '의류') return product.category_id === 3;
    if (activeTab === '장난감') return product.category_id === 4;
    if (activeTab === '추천상품') return ![1, 2, 3, 4].includes(product.category_id); // 1,2,3,4에 포함되지 않는 제품 반환
    return false;
  });

  if (!products) {
    return <p>Loading product details...</p>;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <ShopTabBar activeTab={activeTab} onTabChange={handleTabChange} /> {/* activeTab을 ShopTabBar로 전달 */}
        <div className={styles.itemWrapper}>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.product_id}
              id={product.product_id}
              title={product.product_name}
              price={product.price}
              imageSrc={product.image_url_1}
            />
          ))}
        </div>
      </Wrapper>
      <Navbar selectedMenu="Shop" />
    </>
  );
};

export default ProductListPage;