import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormField from "@/shared/components/ui/FormField.tsx";
import {useCreateTrip, useUpdateTrip} from "@/shared/api/queries.ts";
import moment from "moment";

interface TripFormProps {
  isEditing?: boolean;
  initialData?: Partial<{
    trip_id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    budget_target: number;
    budget_max: number;
  }>;
}

export default function TripFormCard({ isEditing, initialData}: TripFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const createTripMutation = useCreateTrip();
  const editTripMutation = useUpdateTrip();

  const dateParam = searchParams.get("date") || initialData && moment(initialData.start_date).format("YYYY-MM-DD") || "";

  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    start_date: dateParam,
    end_date: initialData ? moment(initialData.end_date).format("YYYY-MM-DD") : "",
    budget_target: initialData?.budget_target ?? 0,
    budget_max: initialData?.budget_max ?? 0,
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const start = moment(formData.start_date)
    const end = moment(formData.end_date)
    if (end < start) {
      setError("End must be after start");
      return
    } else {
      setError(null);
    }

    try {
      if (isEditing && initialData?.trip_id) {
        const editTrip = await editTripMutation.mutateAsync({
          tripId: initialData.trip_id.toString(),
          updates: {
            title: formData.title,
            description: formData.description,
            start_date: formData.start_date,
            end_date: formData.end_date,
            budget_target: parseFloat(formData.budget_target.toString()) || 0,
            budget_max: parseFloat(formData.budget_max.toString()) || 0,
            expenses: 0,
          }
        });

        navigate(`/trip/${editTrip.id}`);
      } else {
        const newTrip = await createTripMutation.mutateAsync({
          title: formData.title,
          description: formData.description,
          start_date: formData.start_date,
          end_date: formData.end_date,
          budget_target: parseFloat(formData.budget_target.toString()) || 0,
          budget_max: parseFloat(formData.budget_max.toString()) || 0,
          expenses: 0,
        });

        navigate(`/trip/${newTrip.id}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create trip";
      setError(errorMessage);
      console.error("Error creating trip:", err);
    }
  };

  const renderValidationAction = () => {
    if (isEditing) {
      return (
        <button
          type="submit"
          className="login-button"
          disabled={editTripMutation.isPending || error !== null}
        >
          {editTripMutation.isPending ? "Editing..." : "Edit Trip"}
        </button>
      )
    }

    return (
      <button
        type="submit"
        className="login-button"
        disabled={createTripMutation.isPending || error !== null}
      >
        {createTripMutation.isPending ? "Creating..." : "Create Trip"}
      </button>
    )
  }
  return (
    <div className="form-card">
      <div className="form-header">
        <h1>New trip</h1>
        <p>Fill out the details below to plan your next adventure.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="form-trip" onSubmit={handleSubmit}>
        <FormField
          id="title"
          name="title"
          label="Titre du voyage"
          type="text"
          placeholder="Ex: Girl's trip to Paris"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <FormField
          id="description"
          name="description"
          label="Description"
          type="text"
          placeholder="Vacation"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <div className="form-section">
          <h2 className="section-title">Dates</h2>
          <div className="form-grid-2">
            <FormField
              id="start_date"
              name="start_date"
              label="Departure date"
              type="date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />

            <FormField
              id="end_date"
              name="end_date"
              label="Return date"
              type="date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Budget</h2>
          <div className="form-grid-2">
            <FormField
              id="budget_target"
              name="budget_target"
              label="Budget target (€)"
              type="number"
              placeholder="600"
              value={formData.budget_target}
              onChange={handleInputChange}
            />

            <FormField
              id="budget_max"
              name="budget_max"
              label="Budget max (€)"
              type="number"
              placeholder="1000"
              value={formData.budget_max}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="login-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          {renderValidationAction()}
        </div>
      </form>
    </div>
  );
}
