// Home Page
// • has a monthly and weekly schedule, an agenda, classes, notes, and notifications
// • Programmers: Emily Proctor, Nathan Mignot, Gabi Kruger, Kenadi Krueger, Brooke West
// • October 2nd, 2023 (first update)
// • March 28th, 2024 (most recent update)
// • Updated: fixed Calendar bugs


import React, { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import "./Home.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import WeeklySchedule from "./Weekly";
import { CiCircleList, CiCalendar, CiPen } from "react-icons/ci";
import logopic from "./logostars2.png";
import CalendarComponent from "./CalendarComponent";

declare module "*.png";

const localizer = momentLocalizer(moment);


// functional component for the home page
function Home() {
  const [toUpdate, setToUpdate] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

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

  // used to handle changes made to toUpdate and firstTime  variables
  useEffect(() => {
    if (firstTime == true) {
      fetchUserEvents();
      setFirstTime(false);
    }
    fetchUserEvents();
    if (toUpdate == true) {
      console.log("made it here");
      saveHomepage();
      setToUpdate(false);
      setFirstTime(true);
    }
  }, [toUpdate, firstTime]);

  // handles the initial call to get the homepage data
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

      // if we got a response from the backend then we can set classes, notes, and events with all the data from the backend database
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

  // handles the calls afterwards when updating the homepage, works for classes and notes at the moment, but struggles
  // with events on the calendar
  const saveHomepage = async () => {
    const homePageData = {
      classList: classes,
      notesTaken: notes,
      eventsScheduled: events,
    };

    // sends a request to the url in charge of updating home page
    try {
      const response = await fetch("http://localhost:5000/update-homepage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homePageData),
        credentials: "include",
      });

      // just used for testing
      console.log(homePageData);

      // data from the backend gets stored to the data variable 
      const data = await response.json();

      if (response.ok) {
        // used for testing, shows data saved correctly
        console.log("Home page saved: ", data);
      } else {
        // if there is an error with data then it fails so this is also just used for testing and ensurance
        console.error("Failed to save home page: ", data.error);
      }
    } catch (error) {
      // catches error if it happens
      console.error("Error saving homepage: ", error);
    }
  };

  // Function to handle adding a new class
  const handleAddClass = () => {
    // checks to see if class has an actual name and isn't being stored as null
    if (newClassName.trim() !== "") {
      // stores the new class at the end of the setClasses array
      setClasses([...classes, newClassName.trim()]);
      // resets newClassName to be null
      setNewClassName("");
      // sets the popup to add a class to false so then it isn't shown
      setShowAddClassPopup(false);
    }
    // sets update to true to ensure that it is able to update when needed
    setToUpdate(true);
  };

  // Function to handle deleting a class
  const handleDeleteClass = () => {
    // checks if class wanting to be deleted has an actual name instead of null
    if (selectedClassIndex !== "") {
      // finds the index of the class wanting to be deleted
      const selectedIndex = Number(selectedClassIndex);
      // updates the list of classes by finding the selected index and removing it
      const updatedClasses = classes.filter(
        (_, index) => index !== selectedIndex
      );
      // updates the classes to be shown correctly 
      setClasses(updatedClasses);
      // gets rid of the delete class pop up
      setShowDeleteClassPopup(false);
    }
    setToUpdate(true);
  };

  // Function to handle adding a new class
  const handleAddNote = () => {
    if (noteText.trim() !== "") {
      setNotes([...notes, noteText.trim()]);
      setNoteText("");
      setShowAddNotePopup(false);
    }
    setToUpdate(true);
  };

  // Function to handle deleting a note
  const handleDeleteNote = () => {
    // checks if note to be deleted isn't null
    if (selectedNoteIndex !== "") {
      // gets index of note to be deleted
      const selectedIndex = Number(selectedNoteIndex);
      // removes note from the notes arrat
      const updatedNotes = notes.filter((_, index) => index !== selectedIndex);
      setNotes(updatedNotes);
      setShowDeleteNotePopup(false);
    }
    setToUpdate(true);
  };

  // event variables
  // used to set events array
  const [events, setEvents] = useState<Event[]>([]);
  // used to show the add event popup
  const [showAddEvent, setShowAddEvent] = useState(false);
  // sets up a new event with everything it needs, title (name), start (time), end (time)
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

    //sets up array for setting all events
    setEvents([...events, createdEvent]);
    // used to create a new event and make sure it has all the associated variables
    setNewEvent({ title: "", start: new Date(), end: new Date() });
    setShowAddEvent(false);
    setToUpdate(true);
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
    setToUpdate(true);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );

    setToUpdate(true);
  };

  return (
    <>
    <div className="grid-container">
         <div className="grid-item">
           {/* handles title and logo image */}
           <div className="logo_container_list">
             <img src={logopic} className="logopic_list" />
             <div className="plannnova" style={{ color: 'black' }}>PlanNova</div>
           </div>
         </div>
         <div className="grid-item">
           {/* navigation bar */}
           <div className="nav-buttons">
             <Link to="/meal-planning" className="links" style={{ color: '#374A67' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#374A67' }}>
               fitness tracker
             </Link>
             <Link to="/list" className="links" style={{ color: '#374A67' }}>
               lists
             </Link>
             <Link to="/home" className="links" style={{ color: '#374A67' }}>
               home
             </Link>
             <Link to="/" className="links" style={{ color: '#374A67' }}>
               logout
             </Link>
           </div>
         </div>
       </div>

       <hr className="line"  style={{ color: '#374A67' }}/>

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
