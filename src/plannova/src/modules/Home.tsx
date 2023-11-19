//this code implements the PlanNova homepage component: logo, monthly calendar, weekly schedule, and more 

//imports React and needed components for the Home page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import MonthCal from "./MonthCal";
import WeeklySchedule from "./Weekly";
import { CiCircleList, CiCalendar, CiPen } from "react-icons/ci";
import logopic from './logostars.png';

declare module '*.png';

function Home(){  //intitalizes a home component function 

  const currentDate = new Date();  //sets date to current date (for monthly calendar)
  const options: Intl.DateTimeFormatOptions = {  //formatting for monthly calendar 
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options); //creates the formatted date 

    return(
      //following sets up the homepage styling, logo, weekly schedule, and montly calendar
        <div className="home-page" > 
        <div>
          <div className="logo">★PlanNova</div>
          <div className="week">weekly schedule <WeeklySchedule /></div>
          <div className="calendar">
            <div className="date-title">{formattedDate}</div>
            <MonthCal />
          </div>
        </div>
        <div>
          {/* sets up navigation bar and buttons for page that navigates to each respective page */}
          <div className="nav-buttons">
            <Link to="/list" className="links">lists</Link>
            <Link to="/meal-planning" className="links">meal planning</Link>
            <Link to="/fitness-tracker" className="links">fitness tracker</Link>
            <button className="buttons button"> logout</button>
          </div>
          {/* daily calendar and subsections  */}
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