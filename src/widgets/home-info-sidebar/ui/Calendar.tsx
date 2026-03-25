import "@/widgets/home-info-sidebar/styles/Calendar.css"
import moment from 'moment';

export default function Calendar() {
  const now = moment();
  const currentMonthName = now.format('MMMM'); // "mars"
  const currentYear = now.format('YYYY');      // "2026"

  const startOfMonth = now.clone().startOf('month');
  const startDayIndex = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1;
  const daysInMonth = now.daysInMonth();
  const calendarCells = [];

  for (let i = 0; i < startDayIndex; i++) {
    calendarCells.push(<span key={`empty-${i}`} className="cal-day-empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDayMoment = now.clone().date(day);
    const isToday = currentDayMoment.isSame(moment(), 'day');

    // const hasEvent = upcomingTrips.some(trip => moment(trip.startDate).isSame(currentDayMoment, 'day'));
    const hasEvent = false;

    calendarCells.push(
      <span
        key={day}
        className={`cal-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
      >
        {day}
        {hasEvent && <span className="event-dot" />}
      </span>
    );
  }

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        {currentMonthName} {currentYear}
      </div>

      <div className="calendar-grid">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, index) => (
          <span key={index} className="cal-day-name">{d}</span>
        ))}

        {calendarCells}
      </div>
    </div>
  );
}