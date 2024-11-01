import { create } from 'zustand';

const useTotalStore = create((set) => ({
  quantity: 1,
  unitPrice: 0,
  totalPrice: 0,
  setUnitPrice: (price) => set((state) => ({
    unitPrice: price,
    totalPrice: price * state.quantity,
  })),
  setQuantity: (newQuantity) => set((state) => ({
    quantity: newQuantity,
    totalPrice: newQuantity * state.unitPrice,
  })),
}));

export default useTotalStore;