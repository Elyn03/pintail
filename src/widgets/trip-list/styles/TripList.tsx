import "@/widgets/trip-list/ui/TripList.css";
import {Link} from "react-router-dom";
import {TripCard} from "@/entities/trip";
import {products} from "@/shared/api/fakeApi.ts";
import type {Trip} from "@/entities/trip/types.ts";

export default function TripList() {
  return (
    <section className="trip-list">
      <div className="trip-list-header">
        filter + sort
        <Link to="/trip/new">Add new trip</Link>
      </div>
      <div className="grid">
        {products.map((product: Trip) => (
          <TripCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
