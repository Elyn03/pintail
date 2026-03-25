import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "@/shared/components/ui/FormField.tsx";
import { useCreateTrip } from "@/shared/api/queries.ts";
import { useAuthStore } from "@/app/store/useUserStore.ts";

interface SimpleTripFormProps {
  initialDate?: Date;
  onClose?: () => void;
  onSuccess?: (message: string) => void;
}

export default function SimpleTripForm({
  initialDate,
  onClose,
  onSuccess,
}: SimpleTripFormProps) {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const createTripMutation = useCreateTrip();

  const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: initialDate ? formatDateToISO(initialDate) : "",
    end_date: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setSuccess(null);

    if (!session?.user?.id) {
      setError("You must be logged in to create a trip");
      navigate("/login");
      return;
    }

    try {
      await createTripMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        budget_target: 0,
        budget_max: 0,
        user_id: session.user.id,
        expenses: 0,
      });

      const successMessage = `✓ Trip "${formData.title}" created successfully!`;
      setSuccess(successMessage);

      if (onSuccess) {
        onSuccess(successMessage);
      }

      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create trip";
      setError(errorMessage);
      console.error("Error creating trip:", err);
    }
  };

  const handleMoreOptions = () => {
    const dateParam = formData.start_date ? `?date=${formData.start_date}` : "";
    navigate(`/trip/new${dateParam}`);
    if (onClose) onClose();
  };

  return (
    <form className="simple-trip-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      {success && <div className="success-message">{success}</div>}

      <FormField
        id="title"
        name="title"
        label="Trip Title"
        type="text"
        placeholder="Ex: Paris Weekend"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <FormField
        id="description"
        name="description"
        label="Description"
        type="text"
        placeholder="Ex: City tour"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <div className="simple-trip-form__dates">
        <FormField
          id="start_date"
          name="start_date"
          label="Start Date"
          type="date"
          value={formData.start_date}
          onChange={handleInputChange}
          required
        />
        <FormField
          id="end_date"
          name="end_date"
          label="End Date"
          type="date"
          value={formData.end_date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="simple-form-actions">
        <button
          type="button"
          className="modal-button secondary"
          onClick={handleMoreOptions}
        >
          More Options
        </button>
        <button
          type="submit"
          className="modal-button primary"
          disabled={createTripMutation.isPending}
        >
          {createTripMutation.isPending ? "Creating..." : "Create Trip"}
        </button>
      </div>
    </form>
  );
}
