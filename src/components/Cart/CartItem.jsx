import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../stores/useCartStore';
import CartNumberPicker from '../ProductDetail/CartNumberPicker';
import { useProductStore } from '../../stores/useProductStore';
import styles from './CartItem.module.css';
import Checkbox from '@mui/material/Checkbox';
import noImage from '../../assets/images/no-image.jpg';

const CartItem = ({ item, isSelected, onSelect }) => {
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const getProductById = useProductStore((state) => state.getProductById); // 상품 정보를 가져오는 함수

  const [productDetails, setProductDetails] = useState({});

  const getProductInfo = async () => {
    await fetchProducts();
    const product = getProductById(item.productId);
    if (product) {
      setProductDetails(product);
      console.log('Loaded product details:', product); // 디버깅용 콘솔 출력
    } else {
      console.log('Product not found for productId:', item.productId); // 디버깅용 콘솔 출력
    }
  };

  // 상품 정보를 불러와 productDetails에 설정
  useEffect(() => {
    getProductInfo();
  }, [item.productId, getProductById]);

  // 수량 변경 핸들러
  const handleQuantityChange = (newQuantity) => {
    updateCartItem({ productId: item.productId, quantity: newQuantity });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        {/* 선택 체크박스 */}
        <Checkbox
          checked={isSelected}
          onChange={onSelect}
          sx={{
            color: 'var(--gray-20)', // 기본 색상
            '&.Mui-checked': {
              color: 'var(--primary-default)', // 체크 시 색상
            },
            '& .MuiSvgIcon-root': {
              fontSize: '20px', // 체크 아이콘 크기
              width: '20px',
              height: '20px',
              padding: '0',
              margin: '0',
            },
          }}
        />
        <div className={styles.contentWrapper}>
          {/* 상품 이미지 */}
          <img className={styles.imageContainer} src={productDetails.image_url_1 || noImage} alt={productDetails.product_name || 'Product'} loading="lazy" />

          {/* 상품 정보 */}
          <div>
            <div className={styles.titleText}>{productDetails.product_name || '상품명'}</div> {/* 상품명을 표시 */}
            <div className={styles.priceText}>{(item.totalPrice ?? 0).toLocaleString()}원</div>
          </div>
        </div>
      </div>
      {/* 수량 조절 */}
      <div className={styles.rowWrapper}>
        <div className={styles.labelText}>수량 변경</div>
        <CartNumberPicker
          initialCount={item.quantity} // 현재 수량을 초기 값으로 전달
          onCountChange={handleQuantityChange} // 수량 변경 시 updateItemQuantity 호출
        />
      </div>
      <div className={styles.rowWrapper}>
        <div className={styles.labelText}>수량 변경</div>
        <CartNumberPicker
          initialCount={item.quantity} // 현재 수량을 초기 값으로 전달
          onCountChange={handleQuantityChange} // 수량 변경 시 updateItemQuantity 호출
        />
      </div>
    </div>
  );
};

export default CartItem;
