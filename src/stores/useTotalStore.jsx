// import { create } from 'zustand';

// const useTotalStore = create((set) => ({
//   quantity: 1,
//   unitPrice: 0,
//   totalPrice: 0,
//   setUnitPrice: (price) =>
//     set((state) => ({
//       unitPrice: price,
//       totalPrice: price * state.quantity,
//     })),
//   setQuantity: (newQuantity) =>
//     set((state) => ({
//       quantity: newQuantity,
//       totalPrice: newQuantity * state.unitPrice,
//     })),
// }));

// export default useTotalStore;

// import { create } from 'zustand';

// const useTotalStore = create((set, get) => ({
//   items: [], // 장바구니 아이템 초기값을 빈 배열로 설정
//   selectedItemIds: [], // 선택된 아이템 ID 초기값을 빈 배열로 설정
//   quantity: 1, // 수량 초기값
//   unitPrice: 0, // 단가 초기값
//   totalAmount: 0, // 총 결제 금액 초기값

//   // 수량 설정 함수 정의
//   setQuantity: (newQuantity) =>
//     set((state) => ({
//       quantity: newQuantity,
//       totalAmount: newQuantity * state.unitPrice,
//     })),

//   // 단가 설정 함수 정의
//   setUnitPrice: (price) =>
//     set((state) => ({
//       unitPrice: price,
//       totalAmount: price * state.quantity,
//     })),

//   // 아이템 추가 (수량과 가격을 인자로 받아 처리)
//   addItem: (item, quantity = 1, price) => {
//     set((state) => {
//       const uniqueId = generateUniqueId(item);
//       const existingItemIndex = state.items.findIndex((existingItem) => generateUniqueId(existingItem) === uniqueId);

//       let updatedItems;
//       if (existingItemIndex !== -1) {
//         updatedItems = [...state.items];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity: updatedItems[existingItemIndex].quantity + quantity,
//         };
//       } else {
//         const newItem = { ...item, quantity, price };
//         updatedItems = [...state.items, newItem];
//       }

//       const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       return { items: updatedItems, totalAmount: newTotalAmount };
//     });
//   },

//   // 모든 아이템 제거
//   removeAllItems: () => set({ items: [], selectedItemIds: [], totalAmount: 0 }),

//   // 선택한 아이템 토글
//   toggleSelectItem: (uniqueId) =>
//     set((state) => {
//       const isSelected = state.selectedItemIds.includes(uniqueId);
//       const updatedSelectedItemIds = isSelected ? state.selectedItemIds.filter((itemId) => itemId !== uniqueId) : [...state.selectedItemIds, uniqueId];

//       const selectedItems = state.items.filter((item) => updatedSelectedItemIds.includes(generateUniqueId(item)));
//       const newTotalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       return { selectedItemIds: updatedSelectedItemIds, totalAmount: newTotalAmount };
//     }),

//   // 전체 선택/해제
//   setSelectedItemIds: (ids) =>
//     set((state) => {
//       const selectedItems = state.items.filter((item) => ids.includes(generateUniqueId(item)));
//       const newTotalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       return { selectedItemIds: ids, totalAmount: newTotalAmount };
//     }),

//   // 특정 아이템의 수량 업데이트
//   updateItemQuantity: (uniqueId, quantity) => {
//     set((state) => {
//       const updatedItems = state.items.map((item) => (generateUniqueId(item) === uniqueId ? { ...item, quantity } : item));

//       const selectedItems = updatedItems.filter((item) => state.selectedItemIds.includes(generateUniqueId(item)));
//       const newTotalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       return { items: updatedItems, totalAmount: newTotalAmount };
//     });
//   },

//   // 선택된 아이템의 총 금액 계산
//   calculateTotalAmount: () => {
//     const { items, selectedItemIds } = get();
//     return items.filter((item) => selectedItemIds.includes(generateUniqueId(item))).reduce((total, item) => total + item.price * item.quantity, 0);
//   },
// }));

// // 고유 ID 생성
// const generateUniqueId = (item) => {
//   return `${item.title}-${item.price}-${item.imageSrc}`;
// };

// export default useTotalStore;
import { create } from 'zustand';

const useTotalStore = create((set, get) => ({
  items: [], // 장바구니 아이템 배열
  selectedItemIds: [], // 선택된 아이템 ID 관리
  quantity: 1,
  unitPrice: 0,
  totalPrice: 0,

  // 단가 설정과 총 금액 계산
  setUnitPrice: (price) =>
    set((state) => ({
      unitPrice: price,
      totalPrice: price * state.quantity,
    })),

  // 수량 설정과 총 금액 계산
  setQuantity: (newQuantity) =>
    set((state) => ({
      quantity: newQuantity,
      totalPrice: newQuantity * state.unitPrice,
    })),

  // 아이템 추가 및 수량 반영
  addItem: (item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((i, index) => (index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i));
      } else {
        updatedItems = [...state.items, item];
      }

      return {
        items: updatedItems,
        totalPrice: get().calculateTotalAmount(updatedItems),
      };
    }),

  // 총 결제 금액 계산 메서드
  calculateTotalAmount: (items = get().items) => items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),

  // 전체 선택/해제
  setSelectedItemIds: (ids) => set({ selectedItemIds: ids }),

  // 선택한 아이템 토글
  toggleSelectItem: (id) =>
    set((state) => {
      const isSelected = state.selectedItemIds.includes(id);
      return {
        selectedItemIds: isSelected ? state.selectedItemIds.filter((itemId) => itemId !== id) : [...state.selectedItemIds, id],
      };
    }),
}));

export default useTotalStore;
