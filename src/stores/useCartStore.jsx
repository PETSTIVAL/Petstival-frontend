import { create } from 'zustand';
import { deleteCartItem, insertCartData, selectCartData, updateCartData } from '../services/cartService';
import { persist, createJSONStorage } from 'zustand/middleware';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [], // 장바구니에 담긴 상품 정보를 저장
      cartTotal: 0, // 장바구니 총 금액 합계를 저장

      /* ------- DB에서 장바구니 정보를 불러와 저장 ------- */
      fetchCartItems: async () => {
        // 이미 useCartStore에 정보가 저장되어 있는 경우 DB의 정보를 불러오지 않음
        if (get().cartItems.length) return;

        // useCartStore가 비어 있는 상태인 경우 경우 DB 정보를 불러옴
        const data = await selectCartData();
        if (!data) return; // 장바구니 DB 테이블에 데이터가 없는 경우 return

        set((state) => {
          const newCartItem = data.map((item) => ({
            productId: item.product_id,
            unitPrice: item.price,
            quantity: item.count,
            totalPrice: item.count * item.price,
          }));

          // 총합을 다시 계산
          const newCartTotal = newCartItem.reduce((total, item) => total + item.totalPrice, 0);
          return {
            cartItems: newCartItem,
            cartTotal: newCartTotal,
          };
        });
      },

      /* ------- 장바구니에 새로운 상품 정보를 저장 ------- */
      addCartItem: async ({ productId, unitPrice, quantity }) => {
        // DB의 장바구니 테이블에 담긴 상품 정보 저장
        const data = await insertCartData({ productId, quantity, unitPrice });

        // 장바구니 store에 담긴 상품 정보를 저장
        set((state) => {
          const newCartItem = {
            productId, // 상품 아이디
            unitPrice, // 상품 가격
            quantity, // 상품 선택 개수
            totalPrice: unitPrice * quantity, // 상품별 총 금액
          };

          // 장바구니 정보 업데이트
          return {
            cartItems: [...state.cartItems, newCartItem],
            cartTotal: state.cartTotal + newCartItem.totalPrice,
          };
        });

        // 업데이트된 상태를 즉시 반환
        return get().cartItems;
      },

      /* ------- 장바구니에 담긴 아이템의 개수 정보를 업데이트 ------- */
      updateCartItem: async ({ productId, quantity }) => {
        // DB의 장바구니 테이블에 담긴 상품 정보 저장
        await updateCartData({ productId, quantity });

        set((state) => {
          const updatedCartItems = state.cartItems.map((item) => {
            // 장바구니에서 productId가 일치하는 아이템을 검색
            if (item.productId === productId) {
              return {
                ...item,
                quantity, // 업데이트된 quantity 반영
                totalPrice: item.unitPrice * quantity, // quantity에 따라 totalPrice를 재계산}
              };
            } else {
              return item;
            }
          });

          // 총합을 다시 계산
          const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

          // 업데이트된 장바구니 정보 return
          return {
            cartItems: updatedCartItems,
            cartTotal: newCartTotal,
          };
        });

        // 업데이트된 상태를 즉시 반환
        return get().cartItems;
      },

      /* ------- 장바구니에 담긴 아이템을 삭제 ------- */
      removeCartItems: async (productIdList) => {
        // DB에서 productIdList에 해당하는 장바구니 정보 삭제
        await deleteCartItem(productIdList);

        set((state) => {
          // 장바구니에서 선택한 상품 목록을 제외한 아이템만 남김
          const updatedCartItems = state.cartItems.filter((item) => !productIdList.includes(item.productId));

          // 총합을 다시 계산
          const newCartTotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

          // 업데이트된 장바구니 정보 return
          return {
            cartItems: updatedCartItems,
            cartTotal: newCartTotal,
          };
        });
        // 업데이트된 상태를 즉시 반환
        return get().cartItems;
      },

      /* ------- 로그아웃, 회원탈퇴 시 장바구니 정보 초기화 ------- */
      clearCart: () => {
        set({
          cartItems: [],
          cartTotal: 0, // 유저 정보 초기화 및 인증 상태 초기화
        });
        sessionStorage.removeItem('cart-storage'); // 세션 스토리지의 장바구니 정보도 초기화
      },
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage), // sessionStorage를 사용
    }
  )
);
