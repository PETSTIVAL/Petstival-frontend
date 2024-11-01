import styles from './Input.module.css';
import getDateToday from '../../../utils/getDateToday';

function Input({ type, value, placeholder, setData }) {
  const today = getDateToday();

  return (
    <div className={`${styles.container}`}>
      <input
        className={`${styles.input} drop-shadow-default`}
        value={value}
        type={type}
        max={type === 'date' ? today : null}
        placeholder={placeholder}
        onChange={setData}
      />
    </div>
  );
}

export default Input;
