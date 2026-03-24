import { create } from 'zustand';
import type { CartItem } from '../../entities/cart/types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
}
export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.cartUuid !== id),
    })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set(({ isCartOpen }) => ({ isCartOpen: !isCartOpen })),
}));