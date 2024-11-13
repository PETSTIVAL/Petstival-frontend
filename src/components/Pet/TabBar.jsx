import React from 'react';
import styles from './TabBar.module.css';

const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = ['반려견', '펫스티벌'];

  return (
    <div className={styles.TabBar}>
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

export default TabBar;
