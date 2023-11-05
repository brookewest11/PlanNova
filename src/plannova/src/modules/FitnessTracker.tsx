import React from 'react';
import "./FitnessTracker.css";
import { Link } from 'react-router-dom';
import {useState} from 'react'
import MonthCal from "./MonthCal";
import SearchBar from "./fitnessSearch";

import logopic from './logostars.png';

declare module '*.png';

function FitnessTracker(){

  
  return(
      <>
      <div className="grid-container">
      <div className="grid-item">
      <div className="grid-container3">
        <img src={logopic} alt="Logo" className="logopic" />
        <h1 className='logo'>PlanNova</h1>
      </div>
      </div>
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
  
    <div className="textbox-container1">
      <label className="textbox-label" htmlFor="textbox1">type:</label>
      <input type="text" id="textbox1" className="textbox-input" />
    </div>

    <div className="textbox-container2">
      <label className="textbox-label" htmlFor="textbox2">time/date:</label>
      <input type="text" id="textbox2" className="textbox-input" />
    </div>

    <div className="textbox-container3">
      <label className="textbox-label" htmlFor="textbox3">stats:</label>
      <input type="text" id="textbox3" className="textbox-input" />
    </div>

    <div className="textbox-container4">
      <label className="textbox-label" htmlFor="textbox4">info:</label>
      <input type="text" id="textbox4" className="textbox-input" />
    </div>
  <div className="search-bar">
  <SearchBar />
  </div>
  </>
    )

}

export default FitnessTracker;