import {Navigate, useParams} from "react-router-dom";
import "../styles/TripPage.css"
import {useGetTripById} from "@/shared/api/queries.ts";
import moment from "moment";
import CustomButton from "@/shared/components/ui/CustomButton.tsx";

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
      <header className="trip-page-header">
        <div className="trip-page-title">
          <h1>{trip.title}</h1>
          <p className="trip-page-badge">Trip #{id}</p>
        </div>
        <CustomButton
          variant="contained"
          color="secondary"
          size="small"
          navigateLink={"/trip/new"}
        >
          edit
        </CustomButton>
      </header>

      <section className="trip-bento-grid">
        <article className="trip-bento-card trip-bento-main">
          <div className="trip-bento-header">
            <h2>Trip Summary</h2>
          </div>
          <p className="trip-main-description">
            {trip.description}
          </p>

          <div className="trip-main-meta">
            <div>
              <span className="trip-label">Dates</span>
              <p className="trip-value">
                {moment(trip.start_date).format("LL")} — {moment(trip.end_date).format("LL")}
              </p>
            </div>
            <div>
              <span className="trip-label">Duration</span>
              <p className="trip-value">{moment(trip.end_date).diff(
                moment(trip.start_date),
                "days"
              )}</p>
            </div>
          </div>
        </article>

        <article className="trip-bento-card trip-bento-budget">
          <div className="trip-bento-header">
            <h2>Budget</h2>
          </div>

          <div className="trip-budget-main">
            <span className="trip-label">Total budget</span>
            <p className="trip-budget-amount">
              {trip.budget_max}€
            </p>
          </div>

          <div className="trip-budget-breakdown">
            <div>
              <span className="trip-label">Transport</span>
              <p className="trip-value">600€</p>
            </div>
            <div>
              <span className="trip-label">Accommodation</span>
              <p className="trip-value">700€</p>
            </div>
            <div>
              <span className="trip-label">Activities</span>
              <p className="trip-value">300€</p>
            </div>
            <div>
              <span className="trip-label">Others</span>
              <p className="trip-value">200€</p>
            </div>
          </div>
        </article>

        <article className="trip-bento-card trip-bento-dates">
          <div className="trip-bento-header">
            <h2>Dates du voyage</h2>
          </div>

          <div className="trip-dates-row">
            <div className="trip-date-field">
              <span className="trip-label">Departure</span>
              <div className="trip-input">{moment(trip.start_date).format("DD/MM/YYYY")}</div>
            </div>
            <div className="trip-date-field">
              <span className="trip-label">Return</span>
              <div className="trip-input">{moment(trip.end_date).format("DD/MM/YYYY")}</div>
            </div>
          </div>
        </article>

        <article className="trip-bento-card trip-bento-notes">
          <div className="trip-bento-header">
            <h2>Checklist & notes</h2>
          </div>

          <textarea
            className="trip-notes-input"
            placeholder="Personal notes for this trip..."
          />
        </article>
      </section>
    </main>
  );
}