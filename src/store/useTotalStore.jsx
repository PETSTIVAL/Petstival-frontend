import { create } from 'zustand'

export const useTotalStore = create((set) => {
  return {
    total: 0,
    setTotal: (newTotal) => set({ total: newTotal }), // total 값을 업데이트하는 함수 추가
  }
})
