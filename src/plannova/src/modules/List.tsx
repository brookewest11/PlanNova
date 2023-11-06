//List component 

//needed imports 
import React, { useState } from "react";
import "./List.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";

declare module "*.png"; //needed for logos

function List() {
  const [List1, setList1] = useState("groceries"); //use state for each list 
  const [List2, setList2] = useState("Chores");
  const [List3, setList3] = useState("EXTRA");
  const [numOfBoxes, setnumOfBoxes] = useState(5);

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div className="grid-container3">
            <img src={logopic} alt="Logo" className="logopic" />
            <h1 className="logo">PlanNova</h1>
          </div>
        </div>
        <div className="grid-item">
          {/* navigation bar for this page  */}
          <div className="nav-buttons">
            <Link to="/list" className="links">
              lists
            </Link>
            <Link to="/meal-planning" className="links">
              meal planning
            </Link>
            <Link to="/fitness-tracker" className="links">
              fitness tracker
            </Link>
            <Link to="/" className="links">
              home
            </Link>
            <button className="buttons button"> logout</button>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {/* heading and create new list button  */}
        <h1 className="title">List Planner</h1>
        <button className="button-list"> +create new list</button>
      </div>
      <div>
        <h2 className="sub-title">Current Lists:</h2>
      </div>
      <div className="grid-container2">
        <div className="grid-item2">
          <div className="List">
            {/* creates input checkboxes for each list created  */}
            {List1}
            <div>
              <tr>
                <input type="checkbox" />
                in the code list1 and list2 are rendered slightly differently
              </tr>
              <tr>
                <input type="checkbox" />
                {List1}
              </tr>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="List">
            {List2}
            <div>
              <div>
                <input type="checkbox" />
                example
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="List">
            {List3}
            <div>RENDER CHECKBOXES HERE</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
