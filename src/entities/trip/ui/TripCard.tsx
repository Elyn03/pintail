import "@/entities/trip/styles/TripCard.css";
import type {TripDto} from "@/entities/trip/trip-schema.ts";
import CustomButton from "@/shared/components/ui/CustomButton.tsx";

interface TripCardProps {
  key: number;
  trip: TripDto;
}

export default function TripCard({ key, trip }: TripCardProps) {

  const startDate = new Date(trip.start_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });
  const endDate = new Date(trip.end_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });

  return (
    <article key={key} className="trip-card">
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
            voir
          </CustomButton>

          <CustomButton
            variant="contained"
            color="secondary"
            size="medium"
            navigateLink={"/trip/" + trip.id}
          >
            edit
          </CustomButton>

          <CustomButton
            variant="contained"
            color="secondary"
            size="medium"
            navigateLink={"/trip/" + trip.id}
          >
            delete
          </CustomButton>
        </div>
      </div>
    </article>
  );
}