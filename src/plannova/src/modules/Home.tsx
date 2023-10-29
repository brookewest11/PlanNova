import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import MonthCal from "./MonthCal";
import WeeklySchedule from "./Weekly";
import { CiCircleList, CiCalendar, CiPen } from "react-icons/ci";
import logopic from './logostars.png';

declare module '*.png';

function Home(){

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return(
        <div className="home-page" >
        <div>
          <div className="logo">PlanNova</div>
          <div className="week">weekly schedule <WeeklySchedule /></div>
          <div className="calendar">
            <div className="date-title">{formattedDate}</div>
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
          <div className="daily-calendar"><CiCalendar className="icons"/>today's schedule</div>
          <input className="firstText"type='text' />
          <div className="pinned-list"> <Link to="/list" ><CiCircleList className="icons"/></Link>pinned lists
          </div>
          <input className="secondText"type='text' />
          <div className="notes"><CiPen className="icons"/>notes</div>
          <input className="thirdText"type='text' />
        </div>
      </div>
    )

}

export default Home;