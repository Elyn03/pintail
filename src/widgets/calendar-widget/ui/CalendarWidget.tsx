import "../styles/calendar.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCalendarState } from "../hooks/useCalendarState";
import { useCalendarDays } from "../hooks/useCalendarDays";
import type { Trip } from "@/entities/trip/types";
import Modal from "@/shared/components/ui/Modal";
import SimpleTripForm from "@/widgets/trip-form-card/ui/SimpleTripForm";
import { useGetUserTrips } from "@/shared/api/queries";
import { useAuthStore } from "@/app/store/useUserStore";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarWidget() {
  const userId = useAuthStore((state) => state.user?.id);
  const navigate = useNavigate();
  const { currentDate, goToPreviousMonth, goToNextMonth, goToToday } =
    useCalendarState();
  const days = useCalendarDays(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  if (!userId) {
    return <div>Please log in to view your calendar.</div>;
  }
  const { data: tripsData = [] } = useGetUserTrips(userId);

  if (!userId) {
    return <div>Please log in to view your calendar.</div>;
  }

  const trips: Trip[] = tripsData.map((trip) => ({
    ...trip,
    id: String(trip.id),
  }));

  // Precompute date-to-trips map for O(1) lookups instead of filtering on every render
  const tripsMap = useMemo(() => {
    const map = new Map<string, Trip[]>();
    for (const day of days) {
      const dateKey = day.date.toISOString().split("T")[0]; // YYYY-MM-DD
      const tripsForDay = trips.filter((trip) => {
        const tripStart = new Date(trip.start_date);
        const tripEnd = new Date(trip.end_date);
        const dayToCheck = new Date(
          day.date.getFullYear(),
          day.date.getMonth(),
          day.date.getDate(),
        );
        return dayToCheck >= tripStart && dayToCheck <= tripEnd;
      });
      map.set(dateKey, tripsForDay);
    }
    return map;
  }, [trips, days]);

  const monthYear = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const handleDayDoubleClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(undefined);
  };

  return (
    <ErrorBoundary>
      <div className="calendar">
        <div className="calendar-header">
          <h2 className="title">{monthYear}</h2>
          <div className="calendar-navigation">
            <button
              className="button create-trip-btn"
              onClick={() => navigate("/trip/new")}
            >
              Create Trip
            </button>
            <button className="button" onClick={goToPreviousMonth}>
              ← Previous
            </button>
            <button className="button today-btn" onClick={goToToday}>
              Today
            </button>
            <button className="button" onClick={goToNextMonth}>
              Next →
            </button>
          </div>
        </div>

        <div>
          <div className="weekdays">
            {WEEKDAYS.map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="days-grid">
            {days.map((day, index) => {
              const dateKey = day.date.toISOString().split("T")[0];
              const tripsForDay = tripsMap.get(dateKey) || [];
              return (
                <div
                  role="button"
                  tabIndex={0}
                  key={`${day.date.toISOString().split("T")[0]}-${index}`}
                  className={`day ${
                    day.isCurrentMonth ? "day-current" : "day-other"
                  } ${day.isToday ? "day-today" : ""}`}
                  onDoubleClick={
                    day.isCurrentMonth
                      ? () => handleDayDoubleClick(day.date)
                      : undefined
                  }
                >
                  <div className="day-number">{day.date.getDate()}</div>
                  <div className="day-trips">
                    {tripsForDay.map((trip) => (
                      <div
                        key={trip.id}
                        className="trip-tag"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/trip/${trip.id}`);
                        }}
                      >
                        {trip.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add a new trip"
        >
          {selectedDate && (
            <SimpleTripForm
              initialDate={selectedDate}
              onClose={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
