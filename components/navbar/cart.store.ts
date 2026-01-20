import { create } from "zustand";

interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
  increment: () => void;
  decrement: (by?: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  increment: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrement: (by = 1) => set((state) => ({ cartCount: state.cartCount - by })),
}));
