import "@/entities/trip/styles/TripCard.css";
import type { Trip } from '../types.ts';
interface ProductCardProps {
  product: Trip;
}

export default function TripCard({ product }: ProductCardProps) {
  return (
    <article className="trip-card">
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
