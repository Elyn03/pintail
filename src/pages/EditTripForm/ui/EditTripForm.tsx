import "@/pages/EditTripForm/styles/EditTripForm.css";
import TripFormCard from "@/widgets/trip-form-card/ui/TripFormCard.tsx";
import {Navigate, useParams} from "react-router-dom";
import {useGetTripById} from "@/shared/api/queries.ts";

export default function EditTripForm() {
  const { id } = useParams<{ id: string }>();
  const { data: trip, isLoading, error } = useGetTripById(id ?? "")

  if (!id) {
    return <Navigate to="/" replace />
  }

  if (isLoading || error) {
    return
  }

  if (!trip) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="main-content trip-form-container">
      <TripFormCard
        isEditing={true}
        initialData={{
          trip_id: trip.id,
          title:trip.title,
          description:trip.description,
          start_date: trip.start_date,
          end_date: trip.end_date,
          budget_target: trip.budget_target,
          budget_max: trip.budget_max
        }}
      />
    </main>
  );
}