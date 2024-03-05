import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import WeeklySchedule from "./Weekly";
import { CiCircleList, CiCalendar, CiPen } from "react-icons/ci";
import logopic from "./logostars.png";
import CalendarComponent from "./CalendarComponent";

declare module "*.png";

const localizer = momentLocalizer(moment);

function Home() {
  // class variables
  const [classes, setClasses] = useState<string[]>([]);
  const [showAddClassPopup, setShowAddClassPopup] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [ShowDeleteClassPopup, setShowDeleteClassPopup] = useState(false);
  const [selectedClassIndex, setSelectedClassIndex] = useState<string | number>(
    ""
  );

  // notes variables
  const [notes, setNotes] = useState<string[]>([]);
  const [noteText, setNoteText] = useState("");
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [ShowDeleteNotePopup, setShowDeleteNotePopup] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<string | number>(
    ""
  );

  /*useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-user-homepage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setClasses(data.classes);
        setNotes(data.notes);
        setEvents(data.events);
      } else {
        console.error("Failed to fetch users homepage data", data.error);
      }
    } catch (error) {
      console.error("Error fetching users homepage data", error);
    }
  };
  */
  const saveHomepage = async () => {
    const homePageData = {
      classList: classes,
      notesTaken: notes,
      eventsScheduled: events,
    };

    console.log(events);

    try {
      const response = await fetch("http://localhost:5000/update-homepage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homePageData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Home page saved: ", data);
      } else {
        console.error("Failed to save home page: ", data.error);
      }
    } catch (error) {
      console.error("Error saving homepage: ", error);
    }
  };

  // Function to handle adding a new class
  const handleAddClass = () => {
    if (newClassName.trim() !== "") {
      setClasses([...classes, newClassName.trim()]);
      setNewClassName("");
      setShowAddClassPopup(false);
    }
    saveHomepage();
  };

  // Function to handle deleting a class
  const handleDeleteClass = () => {
    if (selectedClassIndex !== "") {
      const selectedIndex = Number(selectedClassIndex);
      const updatedClasses = classes.filter(
        (_, index) => index !== selectedIndex
      );
      setClasses(updatedClasses);
      setShowDeleteClassPopup(false);
    }
    saveHomepage();
  };

  // Function to handle adding a new class
  const handleAddNote = () => {
    if (noteText.trim() !== "") {
      setNotes([...notes, noteText.trim()]);
      setNoteText("");
      setShowAddNotePopup(false);
    }
    saveHomepage();
  };

  // Function to handle deleting a class
  const handleDeleteNote = () => {
    if (selectedNoteIndex !== "") {
      const selectedIndex = Number(selectedNoteIndex);
      const updatedNotes = notes.filter((_, index) => index !== selectedIndex);
      setNotes(updatedNotes);
      setShowDeleteNotePopup(false);
    }
    saveHomepage();
  };

  // event variables
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // define Event and associated variables
  interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
  }

  // Function to handle adding new event
  const handleAddEvent = () => {
    const id = events.length + 1;
    const createdEvent = {
      id,
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };
    setEvents([...events, createdEvent]);
    setNewEvent({ title: "", start: new Date(), end: new Date() });
    setShowAddEvent(false);
    saveHomepage();
  };

  // Function to handle editing an event
  const handleEditEvent = (editedEvent: Event) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === editedEvent.id) {
          return editedEvent;
        }
        return event;
      });
    });
    saveHomepage();
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );

    saveHomepage();
  };

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          {/* handles title and logo image */}
          <div className="logo_container_list">
            <img src={logopic} className="logopic_list" />
            <div className="homepage-plannnova">PlanNova</div>
          </div>
        </div>
        <div className="grid-item">
          {/* navigation bar */}
          <div className="nav-buttons">
            <Link to="/meal-planning" className="homepage-links">
              meal planning
            </Link>
            <Link to="/fitness-tracker" className="homepage-links">
              fitness tracker
            </Link>
            <Link to="/list" className="homepage-links">
              lists
            </Link>
            <Link to="/" className="homepage-links">
              logout
            </Link>
          </div>
        </div>
      </div>

      <hr className="homepage-line" />

      {/* add class popup */}
      {showAddClassPopup && (
        <div className="add-class-popup">
          <div className="add-class-popup-content">
            <div className="enter-class-name-title">Enter Class Name</div>
            <input
              type="text"
              placeholder="Class Name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="add-class-input"
            />
            <button className="add-class-sub-button" onClick={handleAddClass}>
              Add Class
            </button>
            <button
              className="add-class-cancel"
              onClick={() => setShowAddClassPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* delete class popup */}
      {ShowDeleteClassPopup && (
        <div className="delete-class-popup">
          <div className="delete-class-popup-content">
            <div className="delete-class-title">Delete Class</div>
            <div className="class-bubble-container">
              {classes.map((note, index) => (
                <div
                  key={index}
                  className="class-bubble"
                  onClick={() => setSelectedClassIndex(index)}
                  style={{
                    backgroundColor:
                      selectedClassIndex === index ? "#c7c7c7" : "#f0f0f0",
                    color: selectedClassIndex === index ? "white" : "black",
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
            <button
              className="delete-class-sub-button"
              onClick={handleDeleteClass}
            >
              Delete Class
            </button>
            <button
              className="delete-class-cancel"
              onClick={() => setShowDeleteClassPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* add event popup */}
      {showAddEvent && (
        <div className="add-event-popup">
          <div className="add-event-popup-content">
            <div className="add-event-title">Add Event</div>
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="title-input"
            />
            <input
              type="datetime-local"
              value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
              }
              className="start-date-input"
            />
            <input
              type="datetime-local"
              value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
              className="end-date-input"
            />
            <button className="add-event-sub-button" onClick={handleAddEvent}>
              Add Event
            </button>
            <button
              className="add-event-cancel"
              onClick={() => setShowAddEvent(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* add note popup */}
      {showAddNotePopup && (
        <div className="homepage-popup">
          <div className="homepage-popup-content">
            <div className="enter-note-title">Enter Note</div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="note-textarea"
              placeholder="Enter your note here"
            />
            <button className="add-note-sub-button" onClick={handleAddNote}>
              Add Note
            </button>
            <button
              className="homepage-cancel"
              onClick={() => setShowAddNotePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* delete note popup */}
      {ShowDeleteNotePopup && (
        <div className="delete-note-popup">
          <div className="delete-note-popup-content">
            <div className="delete-note-title">Delete Note</div>
            <div className="notes-container">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="note-bubble"
                  onClick={() => setSelectedNoteIndex(index)}
                  style={{
                    backgroundColor:
                      selectedNoteIndex === index ? "#c7c7c7" : "#f0f0f0",
                    color: selectedNoteIndex === index ? "white" : "black",
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
            <button
              className="delete-note-sub-button"
              onClick={handleDeleteNote}
            >
              Delete Note
            </button>
            <button
              className="delete-note-cancel"
              onClick={() => setShowDeleteNotePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        className="add-event-button"
        onClick={() => setShowAddEvent(true)}
      >
        + Add event
      </button>

      {/* contains the classes and notes text areas */}
      <div className="top-grid">
        {/* classes */}
        <div className="class-list-box">
          <div className="my-classes-title">My Classes</div>
          {classes.map((className, index) => (
            <div key={index} className="class-list-text">
              <div className="class-bullet"></div>
              <div className="class-text">{className}</div>
            </div>
          ))}
          <button
            className="add-class-button"
            onClick={() => setShowAddClassPopup(true)}
          >
            +
          </button>
          <button
            className="delete-class-button"
            onClick={() => setShowDeleteClassPopup(true)}
          >
            -
          </button>
        </div>
        {/* notes */}
        <div className="notes-box">
          <div className="my-notes-title">Notes</div>
          {notes.map((note, index) => (
            <div key={index} className="note-list-text">
              <div className="note-text">{note}</div>
            </div>
          ))}
          <button
            className="add-note-button"
            onClick={() => setShowAddNotePopup(true)}
          >
            +
          </button>
          <button
            className="delete-note-button"
            onClick={() => setShowDeleteNotePopup(true)}
          >
            -
          </button>
        </div>
      </div>
      {/* calendar */}
      <div className="calendar-page">
        <div>
          <div className="calendar">
            <CalendarComponent
              events={events}
              onEventEdit={handleEditEvent}
              onEventDelete={handleDeleteEvent}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
