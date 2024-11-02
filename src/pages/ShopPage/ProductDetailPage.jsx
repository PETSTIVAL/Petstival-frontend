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
import { useCartStore } from '../../stores/useCartStore';
import YesNoModal from '../../components/Common/Modal/YesNoModal';
import DefaultModal from '../../components/Common/Modal/DefaultModal';
import { useOrderItemStore } from '../../stores/useOrderItemStore';

// TODO 장바구니에 아이템 담은 후 장바구니 페이지로 이동? y/n 모달, 실패 모달(defaultModal) 띄우기
// [x] 장바구니 담기 버튼 클릭 시 addCartItem 실행
// [x] 이미 아이템이 cartStore에 있는 경우 updateCartItem을 실행하는 로직 추가
// [x] YesNoModal의 Y 버튼 클릭 시 장바구니 페이지로 이동
// [x] DB 저장 await, DB 저장이 완료되면 setModalOpen(true)
// [x] DB 저장에 실패하면 setIsFailedModalOpen(true)
// [ ] 구매하기 버튼 클릭 시 useOrderItemStore에 상품 정보 저장

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1); // ItemSelectedContainer에서 변경되는 수량 정보를 저장하는 상태 변수
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const { user } = useAuthStore();
  const { fetchProducts, getProductById } = useProductStore();
  const cartItems = useCartStore((state) => state.cartItems); // 장바구니에 store에 담겨 있는 아이템 정보
  const addCartItem = useCartStore((state) => state.addCartItem); // 장바구니 store에 선택한 상품을 추가하는 함수
  const updateCartItem = useCartStore((state) => state.updateCartItem); // 장바구니 store에 선택한 상품을 추가하는 함수
  const addOrderItem = useOrderItemStore((state) => state.addOrderItem); // 주문 상품 store에 선택한 상품을 추가하는 함수

  const loadProduct = async () => {
    await fetchProducts();
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
  };

  useEffect(() => {
    loadProduct();
  }, [fetchProducts, getProductById, id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
    } else {
      // cartStore에 이미 해당 상품이 담겨있는지 검사
      const prevItem = cartItems.find((item) => item.productId === product.product_id);

      // 이미 장바구니에 아이템이 있는 경우 수량만 업데이트
      if (prevItem) {
        const isUpdated = await updateCartItem({
          productId: prevItem.productId,
          quantity: prevItem.quantity + cartQuantity,
        });
        // 장바구니 정보 업데이트에 실패한 경우 실패 모달 open
        if (!isUpdated) {
          setIsFailedModalOpen(true);
          return;
        }
      } else {
        const isUpdated = await addCartItem({
          productId: product.product_id,
          unitPrice: product.price,
          quantity: cartQuantity,
        });
        // 장바구니 정보 업데이트에 실패한 경우 실패 모달 open
        if (!isUpdated) {
          setIsFailedModalOpen(true);
          return;
        }
      }
      setIsConfirmModalOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      addOrderItem([
        {
          productId: product.product_id,
          unitPrice: product.price,
          quantity: cartQuantity,
        },
      ]);
      navigate(`/order`); // router를 '/order' 로 설정
    }
  };

  return (
    <>
      <Header />
      <div className={styles.detailContainer}>
        <img src={product.image_url_1} alt={product.product_name} />
        <div className={styles.infoTextWrapper}>
          <h2 className={styles.titleText}>{product.product_name}</h2>
          <p className={styles.contentText}>{product.contents}</p>
          <p className={styles.priceTextOrange}>{product.price.toLocaleString()}원</p>
        </div>
        <ItemSelectContainer price={product.price} setCartQuantity={setCartQuantity} />
        <div className={styles.buttonWrapper}>
          <ButtonMedium children={'장바구니 담기'} sub={'secondary'} onClick={handleAddToCart} />
          <ButtonMedium children={'구매하기'} sub={'primary'} onClick={handleBuyNow} />
        </div>
      </div>
      <Navbar selectedMenu="Shop" />
      <YesNoModal
        title={`장바구니 확인`}
        content={`장바구니에 상품을 담았어요.\n장바구니로 이동할까요?`}
        isOpen={isConfirmModalOpen}
        setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
        onYesClick={() => navigate('/cart')}
      />
      <DefaultModal
        title={'장바구니 담기 실패'}
        content={'장바구니에 담기지 않았어요.\n다시 시도해주세요.'}
        isOpen={isFailedModalOpen}
        setIsOpen={setIsFailedModalOpen}
        onYesClick={null}
      />
    </>
  );
};

export default ProductDetailPage;
