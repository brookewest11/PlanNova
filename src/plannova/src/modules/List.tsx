import React, { useState } from "react";
import "./List.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";

declare module "*.png";

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
          <div className="grid-container3">
            <img src={logopic} alt="Logo" className="logopic" />
            <h1 className="logo">PlanNova</h1>
          </div>
        </div>
        <div className="grid-item">
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
