// 펫스티벌 쇼핑 페이지
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../../components/ProductList/ProductItem';
import styles from '../ShopPage/ProductListPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { useProductStore } from '../../stores/useProductStore';

const Wrapper = styled.section`
  padding: 24px;
`;

const PetstivalShopPage = () => {
  const { products, fetchProducts } = useProductStore();
  
  const fetchData = async () => {
  await fetchProducts(); // 비동기 함수 호출
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const filteredProducts = products.filter((product) => {
    if (product.category_id !==1 && product.category_id !==2 && product.category_id !==3 && product.category_id !==4) return true; // 모든 제품 반환
    return false; // 다섯 개의 조건에 해당되지 않는 경우
  });

  return (
    <>
      <Header />
      <Wrapper>
        <div className={styles.itemWrapper}>
          {filteredProducts.map((product) => (
            <ProductItem key={product.product_id} id={product.product_id} title={product.product_name} price={product.price} imageSrc={product.image_url_1} />
          ))}
        </div>
      </Wrapper>
      <Navbar selectedMenu="Shop" />
    </>
  );
};

export default PetstivalShopPage;
