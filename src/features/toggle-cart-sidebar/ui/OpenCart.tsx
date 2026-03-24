import type { PropsWithChildren } from "react";
import { useCartStore } from "../../../app/store/useCartStore";

export default function OpenCart({ children }: PropsWithChildren) {
  const { toggleCart } = useCartStore();
  return (
    <button className="cart-widget-button" onClick={toggleCart}>
      {children}
    </button>
  );
}
