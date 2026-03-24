import { useCartStore } from '../../../app/store/useCartStore';
import type { CartItem } from '../../../entities/cart/types';
import OpenCart from '../../../features/toggle-cart-sidebar/ui/OpenCart';

export default function CartWidget() {
  const totalItems = useCartStore((state) => state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0));

  return (
    <OpenCart>
      🛒 Panier ({totalItems})
    </OpenCart>
  );
}
