import "@/pages/Calendar/styles/SimpleTripForm.css";
import {DeleteTripButton, EditTripButton} from "@/features/trip";
interface HeaderProps {
  id: number;
  title: string;
}

export default function TripPageHeader({id, title}: HeaderProps) {

  return (
    <header className="trip-page-header">
      <div className="trip-page-title">
        <h1>{title}</h1>
        <p className="trip-page-badge">Trip #{id}</p>
      </div>
      <div className="trip-page-actions">
        <EditTripButton id={id} />
        <DeleteTripButton id={id} />
      </div>
    </header>
  )
}
