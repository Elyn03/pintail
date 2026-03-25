import "../styles/TripCard.css";
import type { Product } from '../types';
interface ProductCardProps {
  product: Product;
}

export default function TripCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-dates">{product.name}</p>
        <div className="card-footer">
          <button className="card-btn">See more</button>
        </div>
      </div>
    </article>
  );
}
