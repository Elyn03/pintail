import { AddToCartButton } from '../../../features/add-to-cart';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">{product.price} €</p>
      <AddToCartButton cartItem={{...product, quantity: 1}} />
    </div>
  );
}
