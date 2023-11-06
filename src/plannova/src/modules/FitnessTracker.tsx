import React from 'react';
import "./FitnessTracker.css";
import { Link } from 'react-router-dom';
import Stopwatch from "./Stopwatch";
import {useState} from 'react'
import SearchBar from "./fitnessSearch";
import logopic from './logostars.png';

declare module '*.png';


//creates the function FitnessTracker which when we run the app will be in charge of the fitness tracker page set up and UI
//includes the workout search bar, timer, and input boxes to use for tracking your workout stats
function FitnessTracker(){

  
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
      <input type="text" id="textbox1" className="textbox-input" />
    </div>

  {/* This creates the input box for the time and date of workout the user did */}
    <div className="textbox-container2">
      <label className="textbox-label" htmlFor="textbox2">time/date:</label>
      <input type="text" id="textbox2" className="textbox-input" />
    </div>

  {/* This creates the input box for the stats of workout the user did */}
    <div className="textbox-container3">
      <label className="textbox-label" htmlFor="textbox3">stats:</label>
      <input type="text" id="textbox3" className="textbox-input" />
    </div>

  {/* This creates the input box for the info of workout the user did */}
    <div className="textbox-container4">
      <label className="textbox-label" htmlFor="textbox4">info:</label>
      <input type="text" id="textbox4" className="textbox-input" />
    </div>
    {/* This imports the search bar that we created in fitnessSearch.tsx */}
  <div className="search-bar">
  <SearchBar />
  </div>
  <div className="stopwatch-container">
       <Stopwatch />
  </div>
  </>
  )

}

export default FitnessTracker;