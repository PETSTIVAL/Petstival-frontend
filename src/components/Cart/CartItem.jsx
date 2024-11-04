import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../stores/useCartStore';
import CartNumberPicker from '../ProductDetail/CartNumberPicker';
import { useProductStore } from '../../stores/useProductStore';

const CartItem = ({ item, isSelected, onSelect }) => {
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const getProductById = useProductStore((state) => state.getProductById); // 상품 정보를 가져오는 함수

  const [productDetails, setProductDetails] = useState({});

  // 상품 정보를 불러와 productDetails에 설정
  useEffect(() => {
    const product = getProductById(item.productId);
    if (product) {
      setProductDetails(product);
      console.log('Loaded product details:', product); // 디버깅용 콘솔 출력
    } else {
      console.log('Product not found for productId:', item.productId); // 디버깅용 콘솔 출력
    }
  }, [item.productId, getProductById]);

  // 수량 변경 핸들러
  const handleQuantityChange = (newQuantity) => {
    updateCartItem({ productId: item.productId, quantity: newQuantity });
  };

  return (
    <div className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* 선택 체크박스 */}
      <input type="checkbox" checked={isSelected} onChange={onSelect} aria-label="상품 선택" />

      {/* 상품 이미지 */}
      <img src={productDetails.image_url_1 || '/default-image.png'} alt={productDetails.product_name || 'Product'} style={{ width: 50, height: 50 }} />

      {/* 상품 정보 */}
      <div style={{ flex: 1 }}>
        <p>{productDetails.product_name || '상품명'}</p> {/* 상품명을 표시 */}
        <p>{(item.totalPrice ?? 0).toLocaleString()}원</p>
      </div>

      {/* 수량 조절 */}
      <CartNumberPicker
        initialCount={item.quantity} // 현재 수량을 초기 값으로 전달
        onCountChange={handleQuantityChange} // 수량 변경 시 updateItemQuantity 호출
      />
    </div>
  );
};

export default CartItem;
