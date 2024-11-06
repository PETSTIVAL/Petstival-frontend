import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Header.module.css';
import Logo from '../../assets/logo/logo.svg?react';
import ShoppingCartIcon from '../../assets/icons/cart.svg?react';
import Badge from '@mui/material/Badge';
import { useCartStore } from '../../stores/useCartStore';

function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.cartItems) || []; // items가 undefined일 경우 빈 배열로 초기화
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  const handleCartClick = () => {
    if (user) {
      navigate('/cart'); // 유저가 있을 때 장바구니로 이동
    } else {
      navigate('/login'); // 유저가 없을 때 로그인 페이지로 이동
    }
  };

  // 장바구니 뱃지 최신화를 위해 헤더 컴포넌트가 렌더링될 때 장바구니 정보를 fetch
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className={styles.headerLayout}>
      <Logo onClick={() => navigate('/')} />
      <Badge
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#FF866B', // 원하는 배경색
            color: 'white', // 텍스트 색상
            fontFamily: 'Pretendard', // 원하는 폰트 패밀리
            fontSize: '8px',
            fontWeight: '700',
            minWidth: '12px',
            height: '12px',
            padding: '4px;',
          },
        }}
        badgeContent={cartItems.length}
        color="primary"
        onClick={handleCartClick}
        style={{ cursor: 'pointer' }}
      >
        <ShoppingCartIcon />
      </Badge>
    </div>
  );
}

export default Header;
