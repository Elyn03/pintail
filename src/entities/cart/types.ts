import type { Product } from "../product/types";

export interface CartItem extends Product {
  quantity: number;
  cartUuid?: string;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}