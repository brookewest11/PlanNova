import React from 'react';
import "./FitnessTracker.css";
import { Link } from 'react-router-dom';
import MonthCal from "./MonthCal";

function FitnessTracker(){
    return(
        <div className="grid-container">
        <div className="grid-item">
          <h1 className='logo'> ★ PlanNova</h1>
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
    )

}

export default FitnessTracker;