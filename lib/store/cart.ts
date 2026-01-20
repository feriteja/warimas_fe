// lib/store/cart.ts
import { create } from "zustand";

export type CartItem = {
  variantId?: string;
  productId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  quantityType: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === item.variantId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),
  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i,
      ),
    })),
  clearCart: () => set({ items: [] }),
  setItems: (items) => set({ items }),
}));
