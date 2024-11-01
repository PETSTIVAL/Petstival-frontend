import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Header.module.css';
import Logo from '../../assets/logo/logo.svg?react';
import ShoppingCartIcon from '../../assets/icons/cart.svg?react';

function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleCartClick = () => {
    if (user) {
      navigate('/cart'); // 유저가 있을 때 장바구니로 이동
    } else {
      navigate('/login'); // 유저가 없을 때 로그인 페이지로 이동
    }
  };

  return (
    <div className={styles.headerLayout}>
      <Logo onClick={() => navigate('/')} />
      {/* <ShoppingCartIcon onClick={handleCartClick} style={{ cursor: 'pointer' }} /> */}
    </div>
  );
}

export default Header;
