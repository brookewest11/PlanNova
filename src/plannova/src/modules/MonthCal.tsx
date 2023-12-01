import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthCal.css";

interface Event {
  date: Date;
  content: string;
}

interface CalendarProps {
  events: Event[];
}

const MonthCal: React.FC<CalendarProps> = ({ events }) => {
  const [activeDate, setActiveDate] = useState(new Date());

  const tileContent = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): React.ReactNode => {
    const eventForDate = events.find(
      (event) => event.date.toDateString() === date.toDateString()
    );

    if (view === "month" && eventForDate) {
      return <p className="small">{eventForDate.content}</p>;
    }

    return null;
  };

  const onDateChange = (date: Date) => {
    setActiveDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={() => onDateChange}
        value={activeDate}
        tileContent={tileContent}
        showNavigation={false}
      />
    </div>
  );
};
export default MonthCal;
