
import FormField from "@/shared/components/ui/FormField.tsx";

export default function TripFormCard() {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    console.log(e)
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h1>New trip</h1>
        <p>Fill out the details below to plan your next adventure.</p>
      </div>

      <form className="form-trip" onSubmit={handleSubmit}>
        <FormField
          id="title"
          name="title"
          label="Titre du voyage"
          type="text"
          placeholder="Ex: Girl's trip to Paris"
          required
        />

        <FormField
          id="description"
          name="description"
          label="Description"
          type="text"
          placeholder="Quelles sont vos attentes pour ce voyage ?"
          required
        />

        <div className="form-section">
          <h2 className="section-title">Dates</h2>
          <div className="form-grid-2">
            <FormField
              id="startDate"
              name="startDate"
              label="Date de départ"
              type="date"
              required
            />

            <FormField
              id="endDate"
              name="endDate"
              label="Date de retour"
              type="date"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Budget</h2>
          <div className="form-grid-2">
            <FormField
              id="budgetTarget"
              name="budgetTarget"
              label="Budget cible (€)"
              type="number"
              placeholder="600"
              required
            />

            <FormField
              id="budgetMax"
              name="budgetMax"
              label="Budget max (€)"
              type="number"
              placeholder="1000"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="login-button">
            Cancel
          </button>
          <button type="submit" className="login-button">
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}
