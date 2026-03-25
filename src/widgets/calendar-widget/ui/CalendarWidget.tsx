import "../styles/calendar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCalendarState } from "../hooks/useCalendarState";
import { useCalendarDays } from "../hooks/useCalendarDays";
import { TripList, useFetchTrips } from "@/entities/trip/api/tripApi";
import type { Trip } from "@/entities/trip/types";
import Modal from "@/shared/components/ui/Modal";
import SimpleTripForm from "@/widgets/trip-form-card/ui/SimpleTripForm";

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

// Fonction pour vérifier si un trip couvre une date donnée
const getTripsForDate = (date: Date, trips: Trip[]): Trip[] => {
  return trips.filter((trip) => {
    const tripStart = new Date(trip.start_date);
    const tripEnd = new Date(trip.end_date);
    const dayToCheck = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    return dayToCheck >= tripStart && dayToCheck <= tripEnd;
  });
};

export default function CalendarWidget() {
  const navigate = useNavigate();
  const { currentDate, goToPreviousMonth, goToNextMonth, goToToday } =
    useCalendarState();
  const days = useCalendarDays(currentDate);
  const { data: trips = [] } = useFetchTrips();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

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
            const tripsForDay = getTripsForDate(day.date, trips);
            return (
              <div
                key={index}
                className={`day ${
                  day.isCurrentMonth ? "day-current" : "day-other"
                } ${day.isToday ? "day-today" : ""}`}
                onDoubleClick={() => handleDayDoubleClick(day.date)}
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
      <TripList />

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
  );
}
