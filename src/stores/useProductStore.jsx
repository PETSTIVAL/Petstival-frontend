import { create } from 'zustand';
import supabase from '../services/supabaseClient';

export const useProductStore = create((set, get) => ({
  products: [],

  // 주어진 ID로 제품을 검색하는 함수
  getProductById: (id) => {
    return get().products.find((product) => product.product_id === id);
  },

  // Supabase에서 제품 데이터를 가져와서 상태에 저장하는 함수
  fetchProducts: async () => {
    try {
      const { data, error } = await supabase.from('product').select();
      if (error) throw error;
      set({ products: data }); // 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));