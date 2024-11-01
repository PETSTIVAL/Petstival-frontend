import React from 'react';
import styles from './Navbar.module.css';
import HomeIcon from '../../assets/icons/home.svg?react';
import PetIcon from '../../assets/icons/pet.svg?react';
import ShopIcon from '../../assets/icons/shop.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export default function Navbar(props) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleNavigation = (path) => {
    if (user || path === '/' || path === '/products') {
      navigate(path);
    } else {
      navigate('/login'); // 유저 정보가 null일 때 로그인 페이지로 이동
    }
  };

  return (
    <div className={styles.NavbarLayout}>
      <div onClick={() => handleNavigation('/')} className={`${styles.NavBarBtn} ${props.selectedMenu === 'Home' ? `${styles.NavBarBtnSelected}` : ''}`}>
        <HomeIcon fill={props.selectedMenu === 'Home' ? `var(--primary-default)` : `var(--gray-40)`} />
        <div>홈</div>
      </div>
      <div
        onClick={() => handleNavigation('/products')}
        className={`${styles.NavBarBtn} ${props.selectedMenu === 'Shop' ? `${styles.NavBarBtnSelected}` : ''}`}
      >
        <ShopIcon fill={props.selectedMenu === 'Shop' ? `var(--primary-default)` : `var(--gray-40)`} />
        <div>쇼핑</div>
      </div>
      <div onClick={() => handleNavigation('/pet')} className={`${styles.NavBarBtn} ${props.selectedMenu === 'Pet' ? `${styles.NavBarBtnSelected}` : ''}`}>
        <PetIcon fill={props.selectedMenu === 'Pet' ? `var(--primary-default)` : `var(--gray-40)`} />
        <div>반려견</div>
      </div>
      <div
        onClick={() => handleNavigation('/mypage')}
        className={`${styles.NavBarBtn} ${props.selectedMenu === 'MyPage' ? `${styles.NavBarBtnSelected}` : ''}`}
      >
        <UserIcon fill={props.selectedMenu === 'MyPage' ? `var(--primary-default)` : `var(--gray-40)`} />
        <div>내 정보</div>
      </div>
    </div>
  );
}
