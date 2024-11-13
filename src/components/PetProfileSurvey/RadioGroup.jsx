import { useEffect, useState } from 'react';
import RadioButton from './RadioButton';
import styles from './RadioGroup.module.css';

function RadioGroup({ title, value, selected, setData, size }) {
  return (
    <div className={size === 'Large' ? `${styles.wrapperLarge}` : `${styles.wrapperMedium}`}>
      <div className={`${styles.container} drop-shadow-default ${selected === value[0] ? `${styles.selected}` : ''}`} onClick={() => setData(value[0])}>
        <input type="radio" className={styles.radio} value={value[0]} checked={selected === value[0]} onChange={() => setData(value[0])} />
        <div className={styles.content}>{title[0]}</div>
      </div>

      <div className={`${styles.container} drop-shadow-default ${selected === value[1] ? `${styles.selected}` : ''}`} onClick={() => setData(value[1])}>
        <input type="radio" className={styles.radio} value={value[1]} checked={selected === value[1]} onChange={() => setData(value[1])} />
        <div className={styles.content}>{title[1]}</div>
      </div>
    </div>
  );
}

export default RadioGroup;
