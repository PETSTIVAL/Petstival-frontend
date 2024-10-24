import React from 'react';
import styles from './Navbar.module.css';
import HomeIcon from '../../assets/icons/home.svg?react';
import PetIcon from '../../assets/icons/pet.svg?react';
import ShopIcon from '../../assets/icons/shop.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';

export default function Navbar(props) {
  return (
    <>
      <div className={styles.NavbarLayout}>
        <div className={`${styles.NavBarBtn} ${props.selectedMenu === 'Home' ? `${styles.NavBarBtnSelected}` : ''}`}>
          <HomeIcon fill={props.selectedMenu === 'Home' ? `var(--primary-default)` : `var(--gray-40)`} />
          <div>홈</div>
        </div>
        <div className={`${styles.NavBarBtn} ${props.selectedMenu === 'Shop' ? `${styles.NavBarBtnSelected}` : ''}`}>
          <ShopIcon fill={props.selectedMenu === 'Shop' ? `var(--primary-default)` : `var(--gray-40)`} />
          <div>쇼핑</div>
        </div>
        <div className={`${styles.NavBarBtn} ${props.selectedMenu === 'Pet' ? `${styles.NavBarBtnSelected}` : ''}`}>
          <PetIcon fill={props.selectedMenu === 'Pet' ? `var(--primary-default)` : `var(--gray-40)`} />
          <div>반려견</div>
        </div>
        <div className={`${styles.NavBarBtn} ${props.selectedMenu === 'MyPage' ? `${styles.NavBarBtnSelected}` : ''}`}>
          <UserIcon fill={props.selectedMenu === 'MyPage' ? `var(--primary-default)` : `var(--gray-40)`} />
          <div>내 정보</div>
        </div>
      </div>
    </>
  );
}
