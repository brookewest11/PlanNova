import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthCal.css";

function tileContent({}) {}

function MonthCal() {
  const [date, setDate] = useState<any>(new Date());

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        defaultValue="month"
        calendarType="gregory"
        showNavigation={false}
        prev2Label={null}
        prevLabel={null}
        nextLabel={null}
        next2Label={null}
      />
    </div>
  );
}

export default MonthCal;
