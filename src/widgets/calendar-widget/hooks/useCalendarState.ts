import { useState } from "react";
import type { ViewType } from "../types/calendar.types";

export function useCalendarState() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("month");

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
    });
  };
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
    });
  };
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const toggleViewType = (newView: ViewType) => {
    setViewType(newView);
  };

  return {
    currentDate,
    viewType,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    toggleViewType,
  };
}
