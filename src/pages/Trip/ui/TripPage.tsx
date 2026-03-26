import {Navigate, useParams} from "react-router-dom";
import "../styles/TripPage.css"
import { useGetTripById} from "@/shared/api/queries.ts";
import {TripBudget, TripDates, TripHeader, TripNotes, TripSummary} from "@/widgets/trip-bento-grid";

export default function TripPage() {
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
    <main className="main-content trip-page">
      <TripHeader id={trip.id} title={trip.title} />

      <section className="trip-bento-grid">
        <TripSummary description={trip.description} start_date={trip.start_date} end_date={trip.end_date} />
        <TripBudget budget_max={trip.budget_max} />
        <TripDates start_date={trip.start_date} end_date={trip.end_date} />
        <TripNotes />
      </section>
    </main>
  );
}