import type { Trip } from "../trip/types.ts";

export interface CartItem extends Trip {
  quantity: number;
  cartUuid?: string;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}