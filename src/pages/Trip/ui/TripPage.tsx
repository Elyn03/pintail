import {Navigate, useParams} from "react-router-dom";
import "../styles/TripPage.css"
import {useGetTripById} from "@/shared/api/queries.ts";
import moment from "moment";

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const { data: trip, isLoading, error } = useGetTripById(id??"")

  if (!id || !trip) {
    return <Navigate to="/" replace />
  }

  if (isLoading || error) {
    return
  }

  return (
    <main className="main-content trip-page">
      <header className="trip-page-header">
        <h1 className="trip-page-title">{trip.title}</h1>
        <p className="trip-page-badge">Trip #{id}</p>
      </header>

      <section className="trip-bento-grid">
        <article className="trip-bento-card trip-bento-main">
          <div className="trip-bento-header">
            <h2>Résumé du voyage</h2>
          </div>
          <p className="trip-main-description">
            {trip.description}
          </p>

          <div className="trip-main-meta">
            <div>
              <span className="trip-label">Dates</span>
              <p className="trip-value">
                10 mai 2025 — 18 mai 2025
              </p>
            </div>
            <div>
              <span className="trip-label">Durée</span>
              <p className="trip-value">8 jours</p>
            </div>
          </div>
        </article>

        <article className="trip-bento-card trip-bento-budget">
          <div className="trip-bento-header">
            <h2>Budget</h2>
          </div>

          <div className="trip-budget-main">
            <span className="trip-label">Budget total</span>
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
              <span className="trip-label">Hébergement</span>
              <p className="trip-value">700€</p>
            </div>
            <div>
              <span className="trip-label">Activités</span>
              <p className="trip-value">300€</p>
            </div>
            <div>
              <span className="trip-label">Autres</span>
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
              <span className="trip-label">Départ</span>
              <div className="trip-input">{moment(trip.start_date).format("DD/MM/YYYY")}</div>
            </div>
            <div className="trip-date-field">
              <span className="trip-label">Retour</span>
              <div className="trip-input">{moment(trip.end_date).format("DD/MM/YYYY")}</div>
            </div>
          </div>

          <div className="trip-mini-calendar-placeholder">
            <span className="trip-label">Aperçu</span>
            <p className="trip-value">
              Sélectionne une plage de dates sur le calendrier.
            </p>
          </div>
        </article>

        <article className="trip-bento-card trip-bento-notes">
          <div className="trip-bento-header">
            <h2>Checklist & notes</h2>
          </div>

          <ul className="trip-notes-listst">
            <li>Réserver l’hébergement</li>
            <li>Préparer la eSIM / data</li>
            <li>Ajoutez vos idées d’activités</li>
          </ul>

          <textarea
            className="trip-notes-input"
            placeholder="Notes personnelles pour ce voyage..."
          />
        </article>
      </section>
    </main>
  );
}