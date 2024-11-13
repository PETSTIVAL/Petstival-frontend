import styles from './InputNumber.module.css';

function InputNumber({ value, numType, adornment, placeholder, setData }) {
  function handleChange(event) {
    let inputValue = event.target.value;
    if (inputValue < 0) {
      inputValue = 0;
    }
    setData(inputValue);
  }

  return (
    <div className={`${styles.container}`}>
      <input
        className={`${styles.input} drop-shadow-default`}
        type="number"
        value={value}
        inputMode={numType}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={`${styles.adornment}`}>{adornment}</div>
    </div>
  );
}

export default InputNumber;
