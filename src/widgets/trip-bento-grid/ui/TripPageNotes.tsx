import "@/pages/Calendar/styles/SimpleTripForm.css";

export default function TripPageNotes() {

  return (
    <article className="trip-bento-card trip-bento-notes">
      <div className="trip-bento-header">
        <h2>Checklist & notes</h2>
      </div>

      <textarea
        className="trip-notes-input"
        placeholder="Personal notes for this trip..."
      />
    </article>
  )
}
