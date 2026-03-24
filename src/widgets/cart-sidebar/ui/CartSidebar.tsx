import { useCartStore } from "../../../app/store/useCartStore";
import type { CartItem as CartItemType } from "../../../entities/cart/types";
import CartItem from "./CartItem";

export default function CartSidebar() {
  const { items, isCartOpen, toggleCart, clearCart } = useCartStore();

  const isCartEmpty = items.length === 0;

  if (!isCartOpen) return null;

  const totalPrice = items.reduce(
    (total: number, item: CartItemType) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-sidebar-overlay" onClick={() => toggleCart()}>
      <aside className="cart-sidebar" onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Votre Panier</h2>
          <button onClick={() => toggleCart()} className="close-button">
            &times;
          </button>
        </div>

        <div className="cart-body">
          {isCartEmpty ? (
            <p className="empty-cart">Le panier est vide.</p>
          ) : (
            <ul className="cart-items">
              {items.map((item: CartItemType) => (
                <CartItem key={item.cartUuid} cartItem={item} />
              ))}
            </ul>
          )}
        </div>

        {!isCartEmpty && (
          <div className="cart-footer">
            <div className="total">
              <span>Total:</span>
              <span>{totalPrice} €</span>
            </div>
            <button 
              className="clear-button"
              onClick={() => clearCart()}
            >
              Vider le panier
            </button>
            <button className="checkout-button">
              Commander
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
