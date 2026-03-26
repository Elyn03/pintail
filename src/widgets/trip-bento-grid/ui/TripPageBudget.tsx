import "@/pages/Calendar/styles/SimpleTripForm.css";
interface BudgetProps {
  budget_max: number;
}

export default function TripPageBudget({budget_max}: BudgetProps) {

  return (
    <article className="trip-bento-card trip-bento-budget">
      <div className="trip-bento-header">
        <h2>Budget</h2>
      </div>

      <div className="trip-budget-main">
        <span className="trip-label">Total budget</span>
        <p className="trip-budget-amount">
          {budget_max}€
        </p>
      </div>

      <div className="trip-budget-breakdown">
        <div>
          <span className="trip-label">Transport</span>
          <p className="trip-value">...</p>
        </div>
        <div>
          <span className="trip-label">Accommodation</span>
          <p className="trip-value">...</p>
        </div>
        <div>
          <span className="trip-label">Activities</span>
          <p className="trip-value">...</p>
        </div>
        <div>
          <span className="trip-label">Others</span>
          <p className="trip-value">...</p>
        </div>
      </div>
    </article>
  )
}
