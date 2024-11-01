import React from 'react';
import styles from './PriceDisplay.module.css';

const PriceDisplay = ({ price }) => {
  return (
    <div className={styles.priceDisplay}>
      <span>{price.toLocaleString()}원</span> {/* 가격을 포맷팅 */}
    </div>
  );
};

export default PriceDisplay;
