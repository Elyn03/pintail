import "../styles/calendar.css";
import { useCalendarState } from "../hooks/useCalendarState";
import { useCalendarDays } from "../hooks/useCalendarDays";

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
  const { currentDate, goToPreviousMonth, goToNextMonth, goToToday } =
    useCalendarState();
  const days = useCalendarDays(currentDate);

  const monthYear = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2 className="title">{monthYear}</h2>
        <div className="calendar-navigation">
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
          {days.map((day, index) => (
            <div
              key={index}
              className={`day ${
                day.isCurrentMonth ? "day-current" : "day-other"
              } ${day.isToday ? "day-today" : ""}`}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
