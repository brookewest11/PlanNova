import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MonthCal from "./modules/MonthCal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLLIElement
);
root.render(
  <React.StrictMode>
    <div className="home-page">
      <div>
        <div className="logo">PlanNova</div>
        <div className="week">weekly schedule</div>
        <div className="year">current date </div>
        <div className="calendar">
          <MonthCal />
        </div>
      </div>
      <div>
        <div className="nav-buttons">
          <button className="buttons button">Lists</button>
          <button className="buttons button">meal planning</button>
          <button className="buttons button">fitness tracker</button>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
