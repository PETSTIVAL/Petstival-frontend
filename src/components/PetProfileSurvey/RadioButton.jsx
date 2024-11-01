import { useEffect, useState } from 'react';
import styles from './RadioButton.module.css';

function RadioButton({ title, value, selected, setData }) {
  return (
    <div className={`${styles.container} drop-shadow-default ${selected ? `${styles.selected}` : ''}`} onClick={setData}>
      <input type="radio" className={styles.radio} value={value} checked={selected} onChange={setData} />
      <div className={styles.content}>{title}</div>
    </div>
  );
}

export default RadioButton;
