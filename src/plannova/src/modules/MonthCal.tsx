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
  const [activeDate, setActiveDate] = useState<Date | null>(null as Date | null);
  const [newEventContent, setNewEventContent] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
    const eventForDate = events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );

    if (view === "month" && eventForDate.length > 0)
    {
      return (
        <div>
        {eventForDate.map((event, index) => (
          <div key={index}>
            <p className="small">{event.content}</p>
            <button onClick={() => handleRemoveEvent(event)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      );
    }
    return null;
  };
  //as the naivagtion bar is disabled, this currenty serves no purpose, but it is here in case we would like to add navigation back.
  
  /*const onDateChange = (date: Date) => {
    setActiveDate(date);
  };
  */

  const onDateClick = (date: Date) =>
  {
    setActiveDate(date);
    setNewEventContent("");
    setSelectedEvent(null);
  };

  const onClosePopout = () =>
  {
    setActiveDate(null);
    setNewEventContent(""); // reset the input field when closing the popout
    setSelectedEvent(null);
  };

  const onAddEvent = () =>
  {
    if (activeDate && newEventContent.trim() !== "") {
      const newEvent = { date: activeDate, content: newEventContent };
      events.push(newEvent);
      onClosePopout();
    }
  };

  const handleRemoveEvent = (event: Event) => {
    const updatedEvents = events.filter(
      (existingEvent) =>
        existingEvent.date.toDateString() !== event.date.toDateString() ||
        existingEvent.content !== event.content
    );
    events.splice(0, events.length, ...updatedEvents);
  };
  


  return (
    <div>
      <Calendar
        onChange={() => {}}
        value={activeDate || new Date()} //set active date to the new date
        tileContent={tileContent}
        onClickDay = {onDateClick} //handle the day click event
        showNavigation={false}
      />
    {activeDate && (
        <div className="popout">
         <p className="popup-date">Date: {activeDate.toDateString()}</p>
         <div>
            <ul>
              {events
                .filter(
                  (event) => event.date.toDateString() === activeDate.toDateString()
                )
                .map((event, index) => (
                  <li key={index}>{event.content}</li>
                ))}
            </ul>
          </div>
          <input
            type="text"
            placeholder="enter event details"
            value={newEventContent}
            onChange={(e) => setNewEventContent(e.target.value)}
          />
          <button onClick={onAddEvent}>add event</button>
          {selectedEvent && (
            <div>
              <p>selected event:</p>
              <p>{selectedEvent.content}</p>
            </div>
          )}
          <p className="close-button" onClick={onClosePopout}>
            close
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthCal;