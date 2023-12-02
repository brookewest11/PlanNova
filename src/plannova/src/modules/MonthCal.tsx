import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthCal.css";

interface Event {
  //object to contain both the dates and events happening on the date.
  date: Date;
  content: string;
}

interface CalendarProps {
  //object to contain an array of the event type declared above.
  events: Event[];
}

const MonthCal: React.FC<CalendarProps> = ({ events }) => {
  //original list of event passed to the calendar object when the calendar is called.
  const [activeDate, setActiveDate] = useState(new Date()); //state used by the calendar to change the date of the calendar

  /*
    the tile content function is what puts the content of each day within the calendar, when called from the 
    calendar module, it takes in both the date and view prop in order to check against the month view value and also 
    the specific date of the day in the calendar.
    This is done so each event will have a date to check against on its own date attribute.
  */
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
      /*
        thinking of changing the content string in the Event object to an array, which would more than likely need the
        return to instead by a content.map function in order to map each event from the content to its own paragraph element.
        Would be fairly easy to rip it from the List.tsx page in in order to ouput the dynamic content.
      */

      return <p className="small">{eventForDate.content}</p>;
    }

    return null;
  };
  //as the naivagtion bar is disabled, this currenty serves no purpose, but it is here in case we would like to add navigation back.
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
