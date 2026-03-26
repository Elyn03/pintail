import "@/pages/CreateTripForm/styles/CreateTripForm.css";
import TripFormCard from "@/widgets/trip-form-card/ui/TripFormCard.tsx";

export default function CreateTripForm() {
  return (
    <main className="main-content trip-form-container">
      <TripFormCard />
    </main>
  );
}