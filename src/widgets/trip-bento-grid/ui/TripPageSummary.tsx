import "@/pages/Calendar/styles/SimpleTripForm.css";
import moment from "moment/moment";
interface SummaryProps {
  description: string;
  start_date: string;
  end_date: string;
}

export default function TripPageSummary({description, start_date, end_date,}: SummaryProps) {

  return (
    <article className="trip-bento-card trip-bento-main">
      <div className="trip-bento-header">
        <h2>Trip Summary</h2>
      </div>
      <p className="trip-main-description">
        {description}
      </p>

      <div className="trip-main-meta">
        <div>
          <span className="trip-label">Dates</span>
          <p className="trip-value">
            {moment(start_date).format("LL")} — {moment(end_date).format("LL")}
          </p>
        </div>
        <div>
          <span className="trip-label">Duration</span>
          <p className="trip-value">{moment(end_date).diff(
            moment(start_date),
            "days"
          )}</p>
        </div>
      </div>
    </article>
  )
}
