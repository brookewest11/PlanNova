import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import MonthCal from "./MonthCal";


function Home(){
    return(
        <div className="home-page">
        <div>
          <div className="logo"> ★ PlanNova</div>
          <div className="week">weekly schedule</div>
          <div className="year">current date </div>
          <div className="calendar">
            <MonthCal />
          </div>
        </div>
        <div>
          <div className="nav-buttons">
            <Link to="/list" className="links">lists</Link>
            <Link to="/meal-planning" className="links">meal planning</Link>
            <Link to="/fitness-tracker" className="links">fitness tracker</Link>
            <button className="buttons button"> logout</button>
          </div>
          <div className="daily-calendar">daily calendar</div>
          <input className="firstText"type='text' />
          <div className="pinned-list">pinned lists</div>
          <input className="secondText"type='text' />
          <div className="notes">notes</div>
          <input className="thirdText"type='text' />
        </div>
      </div>
    )

}

export default Home;