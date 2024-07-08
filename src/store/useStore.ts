// src/store/useStore.ts
import create from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface StoreState {
  products: Product[];
  cart: Product[];
  addProductToCart: (product: Product) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  cart: [],
  addProductToCart: (product) =>
    set((state) => ({ cart: [...state.cart, product] })),
}));
