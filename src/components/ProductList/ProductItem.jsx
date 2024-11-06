import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css'; // CSS 모듈 import

// TODO 이미지 로딩 시 스켈레톤 이미지 추가 (시간나면)

const ProductItem = ({ id, title, price, imageSrc, isLoading }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className={styles.item}>
        <img src={imageSrc} alt={title} className={styles.productImage} />
        <div className={styles.productTitle}>{title}</div>
        <div className={styles.productPrice}>{price.toLocaleString()}원</div>
      </div>
    </Link>
  );
};

export default ProductItem;
