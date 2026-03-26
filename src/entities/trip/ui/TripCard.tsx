import "@/entities/trip/styles/TripCard.css";
import type {TripDto} from "@/entities/trip/trip-schema.ts";
import CustomButton from "@/shared/components/ui/CustomButton.tsx";
import {useDeleteTripById} from "@/shared/api/queries.ts";

interface TripCardProps {
  trip: TripDto;
}

export default function TripCard({ trip }: TripCardProps) {
  const deleteTripMutation  = useDeleteTripById(trip.id.toString())

  const startDate = new Date(trip.start_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });
  const endDate = new Date(trip.end_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });

  const handleDelete = () => {
    if (window.confirm("Permanently delete this trip")) {
      deleteTripMutation.mutate();
    }
  }

  return (
    <article key={trip.id} className="trip-card">
      <div className="trip-card-content">
        <div className="trip-content">
          <div className="trip-card-title">
            <h3>{trip.title}</h3>
            <span>{trip.description}</span>
          </div>

          <p className="trip-card-dates">
            {startDate} - {endDate}
          </p>
        </div>

        <div className="trip-actions">
          <CustomButton
            variant="contained"
            color="secondary"
            size="medium"
            navigateLink={"/trip/" + trip.id}
          >
            👁
          </CustomButton>

          <CustomButton
            variant="contained"
            color="secondary"
            size="medium"
            navigateLink={"/trip/edit/" + trip.id}
          >
            🖍
          </CustomButton>

          <CustomButton
            variant="contained"
            color="secondary"
            size="medium"
            disabled={deleteTripMutation.isPending}
            onClick={handleDelete}
          >
            🗑
          </CustomButton>
        </div>
      </div>
    </article>
  );
}