// 제품 상세 정보 페이지
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import ItemSelectContainer from '../../components/ProductDetail/ItemSelectContainer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ProductDetailPage.module.css';
import ButtonMedium from '../../components/Common/Button/ButtonMedium';

const ProductDetailPage = () => {
  // url에서 id 가져옴
  const { id } = useParams();
  const { fetchProducts, getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
  const {user} = useAuthStore();
  const navigate = useNavigate();

  // Zustand에서 제품 데이터 가져오기
  const loadProduct = async () => {
    await fetchProducts(); // 비동기 함수로 제품 데이터 불러오기
    const foundProduct = getProductById(id);
    setProduct(foundProduct); // 제품을 상태에 저장
  };

  useEffect(() => {
    loadProduct();
  }, [fetchProducts, getProductById, id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    // 장바구니 페이지로 이동
    if(!user){
      navigate('/login');
    }
    else {
      navigate('/cart');
    }
    
  };

  const handleBuyNow = () => {
    if(!user){
      navigate('/login');
    }
    else {
      navigate(`/products/${id}/order`)
    }
    
  };

  return (
    <>
    <Header />
    <div className={styles.detailContainer}>
      {/* 제품 이미지 - 이미지 스토리지에 넣은 URL 사용 */}
      <img
        src={product.image_url_1}
        alt={product.product_name}
      //  className={styles.productDetailImage}
      />
      {/* 제품 제목, 설명, 가격 */}
      <div className={styles.infoTextWrapper}>
        <h2 className={styles.titleText}>{product.product_name}</h2>
        <p className={styles.contentText}>
          {product.contents}
        </p>
        <p className={styles.priceTextOrange}>{product.price.toLocaleString()}원</p>
      </div>
      {/* 수량 선택 및 가격 표시 컴포넌트 삽입 */}
      <ItemSelectContainer price={product.price} />
      {/* 버튼 영역 */}
      <div className={styles.buttonWrapper}>
      <ButtonMedium children={'장바구니 담기'} sub={'secondary'} onClick={handleAddToCart} />
      <ButtonMedium children={'구매하기'} sub={'primary'} onClick={handleBuyNow} />
        {/* <button onClick={handleAddToCart}>장바구니</button>
        <button onClick={handleBuyNow}>구매하기</button> */}
      </div>
    </div>
    <Navbar selectedMenu="Shop" />
    </>
  );
};

export default ProductDetailPage;
