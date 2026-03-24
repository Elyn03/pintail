import { useCartStore } from "../../../app/store/useCartStore";
import type { CartItem } from "../../../entities/cart/types";

type CartItemProps = {
  cartItem: CartItem;
}

export default function CartItem({ cartItem }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem)
  return (
    <li className="cart-item">
      <div className="item-info">
        <h4>{cartItem.name}</h4>
        <p>{cartItem.price} € x {cartItem.quantity}</p>
      </div>
      <button 
        className="remove-button"
        onClick={() => removeItem(cartItem.cartUuid!)}
      >
        Supprimer
      </button>
    </li>
  )
}