//Fitness Tracker component 

//Needed imports 
import React from 'react';
import "./FitnessTracker.css";
import { Link } from 'react-router-dom';
import Stopwatch from "./Stopwatch";
import {useState} from 'react'
import SearchBar from "./fitnessSearch";
import logopic from './logostars.png';

declare module '*.png'; //needed for logo 

//creates type workout so we can allow for the correct values of the workout to be added
interface Workout {
  name: string;
  component: string;
}


//creates the function FitnessTracker which when we run the app will be in charge of the fitness tracker page set up and UI
//includes the workout search bar, timer, and input boxes to use for tracking your workout stats
function FitnessTracker(){

  //handles the useState for selectedworkout to show that it can either be a workout or null
  const [selectedWorkout, setSelectedWorkout] = useState< Workout | null>(null);

  //a function that takes a workout as an input and then sets the selectedworkout state to that workout to later be used
  const handleSelectedWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };
  
  return(
      <>
      <div className="grid-container">
      <div className="grid-item">
      <div className="grid-container3">
        {/* Sets up logo and name at top of the page */}
        <img src={logopic} alt="Logo" className="logopic" />
        <h1 className='logo'>PlanNova</h1>
      </div>
      </div>
      {/* Sets up the links between each page in case if the user wants to go to another page */}
      <div className="grid-item">
          <div className="nav-buttons">
              <Link to="/list" className="links">lists</Link>
              <Link to="/meal-planning" className="links">meal planning</Link>
              <Link to="/fitness-tracker" className="links">fitness tracker</Link>
              <Link to="/" className="links">home</Link>
              <button className="buttons button"> logout</button>
          </div>
      </div>
      </div>

  <div className="track">
    <p>track a workout</p>
  </div>

  {/* This creates the input box for the type of workout the user did */}
  <div className="textbox-container1">
        <label className="textbox-label" htmlFor="textbox1">type:</label>
        <textarea
          id="textbox1"
          className="textbox-input"
          value={selectedWorkout?.name || ''}  // Use the selected workout as the value for the input
          readOnly  // Make the input read-only as the value will be managed by the SearchBar, or else there would really be no point in including the search bar haha
        />
      </div>

  {/* This creates the input box for the time and date of workout the user did */}
    <div className="textbox-container2">
      <label className="textbox-label" htmlFor="textbox2">time/date:</label>
      <textarea id="textbox2" className="textbox-input" />
    </div>

{/* This creates the input box for the stats of workout the user did */}
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

  {/* This creates the input box for the info of workout the user did */}
    <div className="textbox-container4">
      <label className="textbox-label" htmlFor="textbox4">info:</label>
      <textarea id="textbox4" className="textbox-input" />
    </div>

    {/* This imports the search bar that we created in fitnessSearch.tsx */}
    <div className="search-bar">
        <SearchBar onSelectWorkout={handleSelectedWorkout} />
    </div>

   {/* This imports the stop watch that we created in Stopwatch.tsx */}
  <div className="stopwatch-container">
       <Stopwatch />
  </div>

  <p className="past-text">past workouts</p>


  <div className="past-workouts"></div>




  </>
  )

}

export default FitnessTracker;
