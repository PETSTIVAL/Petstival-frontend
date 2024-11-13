import { create } from 'zustand';

const useDeliveryStore = create((set) => ({
  name: '',
  number: '',
  address: '',
  detailAddress: '',
  setName: (name) => set({ name }),
  setNumber: (number) => set({ number }),
  setAddress: (address) => set({ address }),
  setDetailAddress: (detailAddress) => set({ detailAddress }),
}));

export default useDeliveryStore;