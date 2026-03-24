import { useCartStore } from '../../../app/store/useCartStore';
import type { CartItem } from '../../../entities/cart/types';

type AddToCartButtonProps = {
  cartItem: CartItem;
};

export default function AddToCartButton({ cartItem }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <button
      className="add-button"
      onClick={() => addItem({ ...cartItem, cartUuid: crypto.randomUUID() })}
    >
      Ajouter au panier
    </button>
  );
}
