import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// useCartStore : 장바구니 제품 정보를 저장
// useOrderItemStore : 주문할 제품 정보를 저장 및 주문하기 페이지로 전달
// useTotalStore : 총 결제 금액을 계산 및 저장

export const useOrderItemStore = create(
  persist((set, get) => ({
    orderItems: [], // 주문할 상품 정보(productId, unitPrice, quantity)를 저장
    orderTotal: 0, // 주문할 상품들의 총 합계를 저장

    /* ------- 주문할 상품 추가 ------- */
    addOrderItem: (newOrderItems) => {
      // 주문할 상품 정보 추가 및 가격 총합 업데이트
      set({ orderItems: newOrderItems, orderTotal: newOrderItems.reduce((total, item) => total + item.totalPrice, 0) });
      // 업데이트된 상태를 즉시 반환
      return get().orderItems;
    },

    /* ------- 주문할 상품 정보 초기화 ------- */
    clearOrderItem: () => {
      set({
        orderItems: [],
        orderTotal: 0,
      }),
        sessionStorage.removeItem('order-storage'); // 세션 스토리지의 장바구니 정보도 초기화
    },
  })),
  {
    name: 'order-storage',
    storage: createJSONStorage(() => sessionStorage), // sessionStorage를 사용
  }
);
