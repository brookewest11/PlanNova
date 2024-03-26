import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

// define Event and associated variables
interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

// props calendar component recieves in home page
interface CalendarComponentProps {
  events: Event[];
  onEventEdit: (editedEvent: Event) => void;
  onEventDelete: (eventId: number) => void;
}

// define calendar componet
const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events,
  onEventEdit,
  onEventDelete,
}) => {
  // event variables
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedStart, setEditedStart] = useState<string>("");
  const [editedEnd, setEditedEnd] = useState<string>("");
  const [showEditEventPopup, setShowEditEventPopup] = useState(false);

  // notifications
  useEffect(() => {
    events.forEach((event) => scheduleNotification(event));
  }, [events]);

  // handles setting the event when clicked
  const handleEventClick = (event: Event) => {
    const dst = new Date(event.start);
    const det = new Date(event.end);
    setSelectedEvent(event);
    setEditedTitle(event.title);
    setEditedStart(dst.toISOString().slice(0, 16));
    setEditedEnd(det.toISOString().slice(0, 16));
    setShowEditEventPopup(true);
  };

  // handles closing the selected events popup
  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // handles editing an event
  const handleEditEvent = () => {
    if (selectedEvent) {
      const editedEvent: Event = {
        ...selectedEvent,
        title: editedTitle,
        start: new Date(editedStart),
        end: new Date(editedEnd),
      };
      onEventEdit(editedEvent);
      setSelectedEvent(null);
      setShowEditEventPopup(false);
    }
  };

  // deletes an event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onEventDelete(selectedEvent.id);
      setSelectedEvent(null);
    }
  };

  // handles scheduling the notifications and formatting
  const scheduleNotification = (event: Event) => {
    const eventTime = new Date(event.start).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = eventTime - currentTime;

    if (timeDiff > 0) {
      setTimeout(() => {
        toast.info(`You have an event: ${event.title} at ${event.start}`);
      }, timeDiff);
    }
  };

  return (
    <div className="calendar-container">
      {/* define calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
      />

      {/* edit event popup */}
      {selectedEvent && showEditEventPopup && (
        <div className="edit-event-popup">
          <div className="edit-event-popup-content">
            <div className="edit-event-title">Edit Event</div>
            {/* Edit event form */}
            <input
              type="text"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="title-input"
            />
            <input
              type="datetime-local"
              value={editedStart}
              onChange={(e) => setEditedStart(e.target.value)}
              className="start-date-input"
            />
            <input
              type="datetime-local"
              value={editedEnd}
              onChange={(e) => setEditedEnd(e.target.value)}
              className="end-date-input"
            />
            <div className="popup-buttons">
              <button
                className="save-event-changes-button"
                onClick={handleEditEvent}
              >
                Save Changes
              </button>
              <button
                className="delete-event-button"
                onClick={handleDeleteEvent}
              >
                Delete Event
              </button>
              <button
                className="cancel-event-changes-button"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CalendarComponent;
