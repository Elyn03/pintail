'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from "@/shared/components/ui/FormField.tsx";
import { useCreateTrip } from "@/shared/api/queries";
import { useAuthStore } from "@/app/store/useUserStore";

export default function TripFormCard() {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const createTripMutation = useCreateTrip();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    budget_target: '',
    budget_max: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!session?.user?.id) {
      setError('You must be logged in to create a trip');
      navigate('/login');
      return;
    }

    try {
      const newTrip = await createTripMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        budget_target: parseFloat(formData.budget_target),
        budget_max: parseFloat(formData.budget_max),
        user_id: session.user.id,
        expenses: 0,
      });

      navigate(`/trip/${newTrip.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create trip';
      setError(errorMessage);
      console.error('Error creating trip:', err);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h1>New trip</h1>
        <p>Fill out the details below to plan your next adventure.</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

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
              required
            />

            <FormField
              id="budget_max"
              name="budget_max"
              label="Budget max (€)"
              type="number"
              placeholder="1000"
              value={formData.budget_max}
              onChange={handleInputChange}
              required
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
          <button
            type="submit"
            className="login-button"
            disabled={createTripMutation.isPending}
          >
            {createTripMutation.isPending ? 'Creating...' : 'Create Trip'}
          </button>
        </div>
      </form>
    </div>
  );
}
