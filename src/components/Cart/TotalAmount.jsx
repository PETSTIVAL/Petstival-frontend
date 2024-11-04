import React from 'react';
// import useTotalStore from '../../stores/useTotalStore';
import styles from './TotalAmount.module.css';

const TotalAmount = ({ totalAmount }) => {
  // const totalAmount = useTotalStore((state) => state.totalAmount) || 0;

  return (
    <div className={styles.totalAmountContainer}>
      <h2 className={styles.totalLabel}>총 결제 금액</h2>
      <span className={styles.totalValue}>{totalAmount.toLocaleString()}원</span>
    </div>
  );
};

export default TotalAmount;
