import React from 'react';
import styles from './ShopTabBar.module.css';

const ShopTabBar = ({ activeTab, onTabChange }) => {
  const tabs = ['전체', '추천상품', '사료/간식', '위생/배변', '의류', '장난감'];

  return (
    <div className={styles.shopTabBar}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : styles.inactive}`} // 현재 활성화된 탭에만 active 클래스 적용
          onClick={() => onTabChange(tab)} // 탭 클릭 시 onTabChange 호출
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default ShopTabBar;