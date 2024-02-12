//List component 

//needed imports 
import React, { useState } from "react";
import "./List.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";

declare module "*.png"; //needed for logos

function List() {
  const [List1, setList1] = useState(["cheese", "milk", "bread", "apples"]);
  const [List2, setList2] = useState([
    "581-project",
    "665-project",
    "660-studying",
    "565-studying",
  ]);
  const [List3, setList3] = useState(["EXTRA"]);
  const [numOfBoxes, setnumOfBoxes] = useState(5);

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          {/* handles title and logo image */}
          <div className="logo_container_list">
            <img src={logopic} className="logopic_list" />
            <div className="logo_list">PlanNova</div>
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
            <Link to="/home" className="links">
              home
            </Link>
            <Link to="/" className="links">
              logout
            </Link>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {/* heading and create new list button  */}
        <h1 className="title">List Planner</h1>
        <button
          className="button-list"
          onClick={() =>
            alert(
              "not implemented yet, need to figure out how the database will be setup."
            )
          }
        >
          +create new list
        </button>
      </div>
      <div>
        <h2 className="sub-title">Current Lists:</h2>
      </div>
      <div className="grid-container2">
        <div className="grid-item2">
          <div className="List">
            <div className="list-title">Groceries</div>

            <div>
              {List1.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" className="list-items" />
                  <div className="list-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="List">
            <div className="list-title">Homework</div>
            <div>
              {List2.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" className="list-items" />
                  <div className="list-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="List">
            <div className="list-title">Other</div>
            <div>
              {List3.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" className="list-items" />
                  <div className="list-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
