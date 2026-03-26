import { useMemo } from "react";
import type { CalendarDay } from "../types/calendar.types";

export function useCalendarDays(currentDate: Date) {
  return useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const today = new Date();
    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      days.push({
        date: new Date(date),
        isCurrentMonth: date.getMonth() === month,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
        isSelected: false,
      });
    }

    return days;
  }, [currentDate]);
}
