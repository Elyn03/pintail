import "@/pages/Calendar/styles/SimpleTripForm.css";
import moment from "moment/moment";
interface DatesProps {
  start_date: string;
  end_date: string;
}

export default function TripPageDates({start_date, end_date}: DatesProps) {

  return (
    <article className="trip-bento-card trip-bento-dates">
      <div className="trip-bento-header">
        <h2>Dates du voyage</h2>
      </div>

      <div className="trip-dates-row">
        <div className="trip-date-field">
          <span className="trip-label">Departure</span>
          <div className="trip-input">{moment(start_date).format("DD/MM/YYYY")}</div>
        </div>
        <div className="trip-date-field">
          <span className="trip-label">Return</span>
          <div className="trip-input">{moment(end_date).format("DD/MM/YYYY")}</div>
        </div>
      </div>
    </article>
  )
}
