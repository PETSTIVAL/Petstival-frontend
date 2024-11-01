import React, { useState } from 'react';
import styles from './NumberPicker.module.css';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';

const NumberPicker = ({ initialCount = 1, onCountChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount); // 부모 컴포넌트에 새로운 수량 전달
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(newCount); // 부모 컴포넌트에 새로운 수량 전달
  };

  return (
    <div className={styles.numberPicker}>
      <button className={styles.minusButton} onClick={handleDecrement}>
        <img src={minusIcon} alt="Minus" className={styles.iconImage} />
      </button>
      <div className={styles.countDisplay}>{count}</div>
      <button className={styles.plusButton} onClick={handleIncrement}>
        <img src={plusIcon} alt="Plus" className={styles.iconImage} />
      </button>
    </div>
  );
};

export default NumberPicker;
