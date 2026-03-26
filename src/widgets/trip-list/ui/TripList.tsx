import { useSearchParams } from "react-router-dom";
import { useGetUserTrips } from "@/shared/api/queries.ts";
import TripCard from "@/entities/trip/ui/TripCard";
import { useMemo } from "react";
import type { TripDto } from "@/entities/trip/trip-schema.ts";
import "../styles/TripList.css";
import FormField from "@/shared/components/ui/FormField.tsx";
import CustomButton from "@/shared/components/ui/CustomButton.tsx";

interface TripListProps {
  user_id: string
}

export default function TripList({ user_id }: TripListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: trips, isLoading, error } = useGetUserTrips(user_id);
  const search = searchParams.get("query") ?? "";

  const handleSearchChange = (value: string) => {
    if (value.trim() === "") {
      searchParams.delete("query");
      setSearchParams(searchParams, { replace: true });
    } else {
      const next = new URLSearchParams(searchParams);
      next.set("query", value);
      setSearchParams(next, { replace: true });
    }
  };

  const filteredTrips = useMemo(() => {
    if (!trips) return [];
    if (!search) return trips;

    const lower = search.toLowerCase();
    return trips.filter((trip: TripDto) => {
      return (
        trip.title?.toLowerCase().includes(lower) ||
        trip.description?.toLowerCase().includes(lower)
      );
    });
  }, [trips, search]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Trip loading...</div>;
    }

    if (error) {
      return (
        <div className="error">
          Error while loading: {error.message}
        </div>
      );
    }

    return (
      <div className="trip-list-content">
        {filteredTrips && filteredTrips.length > 0 ? (
          filteredTrips.map((trip: TripDto) => (
            <TripCard trip={trip}/>
          ))
        ) : (
          <p className="empty-state">
            No trips match your search.
          </p>
        )}
      </div>
    )
  }

  return (
    <section className="trip-list">
      <div className="trip-list-header">
        <h2>My trips</h2>
        <div className="actions">
          <FormField
            id="search"
            name="search"
            placeholder="Search for a trip..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <CustomButton
            variant="contained"
            color="primary"
            size="large"
            navigateLink={"/trip/new"}
            loading={isLoading}
          >
            Add new trip
          </CustomButton>
        </div>
      </div>

      { renderContent() }
    </section>
  );
}