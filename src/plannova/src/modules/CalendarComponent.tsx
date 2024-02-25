import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarComponentProps {
  events: Event[];
  onEventEdit: (editedEvent: Event) => void;
  onEventDelete: (eventId: number) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onEventEdit, onEventDelete }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedStart, setEditedStart] = useState<string>('');
  const [editedEnd, setEditedEnd] = useState<string>('');
  const [showEditEventPopup, setShowEditEventPopup] = useState(false);

  useEffect(() => {
    events.forEach(event => scheduleNotification(event));
  }, [events]);

  // handles setting the event when clicked
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setEditedTitle(event.title);
    setEditedStart(event.start.toISOString().slice(0, 16)); // Format the start date as needed
    setEditedEnd(event.end.toISOString().slice(0, 16)); 
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
      onEventEdit(editedEvent); // Pass the edited event to the parent component
      setSelectedEvent(null);
      setShowEditEventPopup(false);
    }
  };

  // deletes an event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onEventDelete(selectedEvent.id); // Pass the event ID to the parent component for deletion
      setSelectedEvent(null);
    }
  };

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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
      />
      {selectedEvent && showEditEventPopup &&(
        <div className="edit-event-popup">
          <div className="edit-event-popup-content">
            <div className="edit-event-title">Edit Event</div>
            {/* Edit event form */}
            <input
              type="text"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='title-input'
            />
            <input
              type="datetime-local"
              value={editedStart}
              onChange={(e) => setEditedStart(e.target.value)}
              className='start-date-input'
            />
            <input
              type="datetime-local"
              value={editedEnd}
              onChange={(e) => setEditedEnd(e.target.value)}
              className='end-date-input'
            />
            <div className="popup-buttons">
              <button className='save-event-changes-button' onClick={handleEditEvent}>Save Changes</button>
              <button className='delete-event-button' onClick={handleDeleteEvent}>Delete Event</button>
              <button className='cancel-event-changes-button' onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default CalendarComponent;
