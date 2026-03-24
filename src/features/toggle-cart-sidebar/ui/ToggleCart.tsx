import { useCartStore } from "../../../app/store/useCartStore";

export default function ToggleCart() {
  const { toggleCart } = useCartStore()
    return (
        <button onClick={() => toggleCart()} className="close-button">
            &times;
        </button>
    );
}