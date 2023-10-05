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
        <div className="logo">Assuming this is where the logo will go</div>
        <div className="week">current week schedule</div>
        <div className="year">Current Year goes here </div>
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
        <div className="pinned-list">pinned list</div>
        <div className="notes">notes</div>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
