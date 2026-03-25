import { products } from '../../../shared/api/fakeApi.ts';
import { ProductCard } from '../../../entities/product';
import type { Product } from '../../../entities/product/types.ts';
import "../ui/TripList.css";
import {Link} from "react-router-dom";

export default function TripList() {
  return (
    <section className="trip-list">
      <div className="trip-list-header">
        filter + sort
        <Link to="/trip/new">Add new trip</Link>
      </div>
      <div className="grid">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
