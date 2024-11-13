// import React from 'react';
// import styles from './PriceDisplay.module.css';

// const PriceDisplay = ({ price }) => {
//   return (
//     <div className={styles.priceDisplay}>
//       <span>{price.toLocaleString()}원</span> {/* 가격을 포맷팅 */}
//     </div>
//   );
// };

// export default PriceDisplay;
import React from 'react';
import styles from './PriceDisplay.module.css';

const PriceDisplay = ({ price }) => {
  const displayPrice = typeof price === 'number' ? price.toLocaleString() : '0';

  return (
    <div className={styles.priceDisplay}>
      <span>{displayPrice}원</span>
    </div>
  );
};

export default PriceDisplay;
