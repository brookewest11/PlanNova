//Fitness Tracker component 

//Needed imports 
import React from 'react';
import "./FitnessTracker.css";
import { Link } from 'react-router-dom';
import Stopwatch from "./Stopwatch";
import {useState, useEffect} from 'react'
import SearchBar from "./fitnessSearch";
import logopic from './logostars2.png';

declare module '*.png'; //needed for logo 

//creates type workout so we can allow for the correct values of the workout to be added
interface Workout {
  name: string;
  dateTime: string;
  component: string;
  info: string;
}


//creates the function FitnessTracker which when we run the app will be in charge of the fitness tracker page set up and UI
//includes the workout search bar, timer, and input boxes to use for tracking your workout stats
function FitnessTracker(){

  //handles the useState for selectedworkout to show that it can either be a workout or null
  const [selectedWorkout, setSelectedWorkout] = useState< Workout | null>(null);
  const [pastWorkouts, setPastWorkouts] = useState<Workout[]>([]);


  useEffect(() => {
    fetchFitness();
  }, []);

    // function for fetching specific user lists based on user
    const fetchFitness = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-user-fitness", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        const data = await response.json();
        // if success
        if (response.ok) {
          // set the current list with list stored in backend for user
          setPastWorkouts(data.workouts ?? []);
        } else {
          // Handle error
          console.error("Failed to fetch fitness:", data.error);
        }
      } catch (error) {
        console.error("Error fetching fitness:", error);
      }
    };


  //function used for saving meal plans back to the backend
  //input: nothing
  //output: meal plan data saved to our mongoDB database
  const saveFitness = async () => {
    // Gather workout data from UI inputs
    const nameElement = document.getElementById('textbox1') as HTMLInputElement | null;
    const dateTimeElement = document.getElementById('textbox2') as HTMLInputElement | null;
    const componentElement = document.getElementById('textbox3') as HTMLInputElement | null;
    const infoElement = document.getElementById('textbox4') as HTMLInputElement | null;
  
    // Check if elements exist before accessing their values
    const name = nameElement ? nameElement.value : ''; // Type of workout
    const dateTime = dateTimeElement ? dateTimeElement.value : ''; // Time/Date
    const component = componentElement ? componentElement.value : ''; // Stats
    const info = infoElement ? infoElement.value : ''; // Info
  
    // Create a new workout object
    const newWorkout: Workout = {
      name: name,
      dateTime: dateTime,
      component: component,
      info: info
    };
  
    try {
      // Send the new workout data to the backend
      const response = await fetch("http://localhost:5000/update-fitness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Fitness plan saved successfully:", data);
  
        // Update the state with the new list of past workouts
        setPastWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
      } else {
        console.error("Failed to save fitness plan:", data.error);
        // Handle failure if needed
      }
    } catch (error) {
      console.error("Error saving fitness plan:", error);
      // Handle error if needed
    }
  };
  
  
    //Function used to delete the workout that we want
    //click delete button below which triggers this event
    //update the "Past Workouts" textarea as well
    const deleteFitness = async () => {
      // Check if there's a selected workout to delete
      if (!selectedWorkout) {
        console.error("No workout selected to delete");
        return;
      }
    
     //create a popup that has confirms whether or not the user wants to delete the workout
     //when the workout is selected to be deleted then click "confirm" which then deletes the workout and removes it from the backend
      const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
      if (!confirmDelete) {
        return; // returns if the delete is rejected
      }
      

      try {
        // Send a request to the backend to then delete the selected workout
        const response = await fetch("http://localhost:5000/delete-workout", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedWorkout), 
          credentials: 'include',
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("Workout deleted successfully:", data);
    
          // Update the state to remove the deleted workout from the "Past Workout" text area below
          setPastWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout !== selectedWorkout));
          setSelectedWorkout(null); // Clear the selected workout after it is deleted so that way it isn't shown in the front end
        } else {
          console.error("Failed to delete workout:", data.error);
          // Handle failures
        }
      } catch (error) {
        console.error("Error deleting workout:", error);
        // Handle errors
      }
    };


  //a function that takes a workout as an input and then sets the selectedworkout state to that workout to later be used
  const handleSelectedWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };
  

  const save = () => {
    if (selectedWorkout) {
      setPastWorkouts(prevWorkouts => [...prevWorkouts, selectedWorkout]);
    }
  };
  
  // Function to handle clicking on a past workout
  const handlePastWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };


  return(
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
             <Link to="/meal-planning" className="links" style={{ color: '#7BAB7A' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#7BAB7A' }}>
               fitness tracker
             </Link>
             <Link to="/list" className="links" style={{ color: '#7BAB7A' }}>
               lists
             </Link>
             <Link to="/home" className="links" style={{ color: '#7BAB7A' }}>
               home
             </Link>
             <Link to="/" className="links" style={{ color: '#7BAB7A' }}>
               logout
             </Link>
           </div>
         </div>
       </div>

       <hr className="line" style={{ color: '#7BAB7A' }}/>

  <div className="track" >
  <p className = "tracker-title">Fitness Tracker</p>
  </div>


  <div className="wrapper">
  {/* This creates the input box for the type of workout the user did */}
  <div className="three">
  <div className="textbox-container1">
        <label className="textbox-label" htmlFor="textbox1">type:</label>
        <textarea
          id="textbox1"
          className="textbox-input"
          value={selectedWorkout?.name || ''}  // Use the selected workout as the value for the input
          readOnly  // Make the input read-only as the value will be managed by the SearchBar, or else there would really be no point in including the search bar haha
        />
      </div>
      </div>

  {/* This creates the input box for the time and date of workout the user did */}
  <div className="two">
    <div className="textbox-container2">
      <label className="textbox-label" htmlFor="textbox2">time/date:</label>
      <textarea id="textbox2" className="textbox-input" 
      value={selectedWorkout?.dateTime || ''} 
      onChange={(e) => {
        // Update the selected workout's component when the user types
        const newWorkout = selectedWorkout
          ? { ...selectedWorkout, dateTime: e.target.value }
          : null;
        setSelectedWorkout(newWorkout);
      }}/>
    </div>
    </div>

{/* This creates the input box for the stats of workout the user did */}
<div className="four">
<div className="textbox-container3">
  <label className="textbox-label" htmlFor="textbox3">stats:</label>
  <textarea
    id="textbox3"
    className="textbox-input"
    value={selectedWorkout?.component || ''}
    onChange={(e) => {
      // Update the selected workout's component when the user types
      const newWorkout = selectedWorkout
        ? { ...selectedWorkout, component: e.target.value }
        : null;
      setSelectedWorkout(newWorkout);
    }}
  />
</div>
</div>

  {/* This creates the input box for the info of workout the user did */}
  <div className="five">
    <div className="textbox-container4">
      <label className="textbox-label" htmlFor="textbox4">info:</label>
      <textarea id="textbox4" className="textbox-input" 
      value={selectedWorkout?.info || ''}
      onChange={(e) => {
        // Update the selected workout's info when the user types
        const newWorkout = selectedWorkout
          ? { ...selectedWorkout, info: e.target.value }
          : null;
        setSelectedWorkout(newWorkout);
      }} />
      
    </div>
    </div>

    {/* This imports the search bar that we created in fitnessSearch.tsx */}
    <div className="seven">
    <div className="search-bar">
        <SearchBar onSelectWorkout={handleSelectedWorkout} />
    </div>
    </div>

   {/* This imports the stop watch that we created in Stopwatch.tsx */}
  <div className="six">
  <div className="stopwatch-container">
       <Stopwatch />
  </div>
  </div>
    {/*This is in charge of looping through the array of past workouts and then outputting their information back onto the four
    text area boxes so that the user can look at the past workout closer if they wish*/}
  <div className="eight">
  <p className="past-text">past workouts</p>
  <div className="past-workouts">{pastWorkouts.map((workout, index) => (
  <div key={index} onClick={() => handlePastWorkoutClick(workout)}>
    {workout.name} - {workout.dateTime} 
  </div>
))}</div>

  </div>
  </div>
  <div className="nine">
  <button className="save-button" onClick={() => { saveFitness(); }}>+ Save Workout</button>
</div>
  <div className="ten">
  <button className="delete-button" onClick={() => { deleteFitness(); }}>- Delete Workout</button>
  </div>
  </>
  )

}

export default FitnessTracker;

