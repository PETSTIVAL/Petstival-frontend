import React, { useEffect, useState } from 'react';
import styles from './NumberPicker.module.css';
import MinusIcon from '../../assets/icons/minus.svg?react';
import PlusIcon from '../../assets/icons/plus-black.svg?react';

const NumberPicker = ({ onCountChange }) => {
  const [count, setCount] = useState(1);

  // 화면이 렌더링될 때마다 아이템 선택 개수를 1개로 초기화
  useEffect(() => {
    setCount(1);
  }, []);

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
        <MinusIcon />
      </button>
      <div className={styles.countDisplay}>{count}</div>
      <button className={styles.plusButton} onClick={handleIncrement}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default NumberPicker;
