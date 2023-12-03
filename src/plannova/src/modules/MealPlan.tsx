//Meal Planning page

//Needed imports 
import React, { useState } from "react";
import "./MealPlan.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";

declare module "*.png"; //needed for logo 

function MealPlan() {  //creates MealPlan function 
  const numberOfInputBoxes = 21; // 3 meals a day * 7 days a week 
  const initialInputValues = Array.from(
    { length: numberOfInputBoxes },
    () => ""
  ); //intialized with an array of empty strings (size 21)

  const [inputValues, setInputValues] = useState(initialInputValues); //useState hook to setInput values for meal boxes 

  const handleInputChange = ( //on change of input the following code will run 
  //the input text box value will be changed to what is 
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
        <div>
      <div className="logo_container_meal">
            <img src={logopic} className="logopic_meal" />
            <div className="logo_meal">PlanNova</div>
          </div>
        </div>
        </div>
        <div className="grid-item">
          {/* sets up navigation bar for this page  */}
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
      <div>
        {/* heading and creates 7 meal boxes (each meal box has 3 input text boxes that change as you type in them and hold their value) */}
        <h2 className="title">yourname's meals </h2>
      </div>
      <div className="grid-container2">
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            monday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[2]}
                  onChange={(e) => handleInputChange(e, 2)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            tuesday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[3]}
                  onChange={(e) => handleInputChange(e, 3)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[4]}
                  onChange={(e) => handleInputChange(e, 4)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[5]}
                  onChange={(e) => handleInputChange(e, 5)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            wednesday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[6]}
                  onChange={(e) => handleInputChange(e, 6)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[7]}
                  onChange={(e) => handleInputChange(e, 7)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[8]}
                  onChange={(e) => handleInputChange(e, 8)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            thursday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[9]}
                  onChange={(e) => handleInputChange(e, 9)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[10]}
                  onChange={(e) => handleInputChange(e, 10)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[11]}
                  onChange={(e) => handleInputChange(e, 11)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            friday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[12]}
                  onChange={(e) => handleInputChange(e, 12)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[13]}
                  onChange={(e) => handleInputChange(e, 13)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[14]}
                  onChange={(e) => handleInputChange(e, 14)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            saturday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[15]}
                  onChange={(e) => handleInputChange(e, 15)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[16]}
                  onChange={(e) => handleInputChange(e, 16)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[17]}
                  onChange={(e) => handleInputChange(e, 17)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-item2">
          <div className="mealbox">
            {" "}
            sunday
            <div>
              <br></br>
              breakfast
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[18]}
                  onChange={(e) => handleInputChange(e, 18)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[19]}
                  onChange={(e) => handleInputChange(e, 19)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={0}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[20]}
                  onChange={(e) => handleInputChange(e, 20)}
                  placeholder="add meal..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MealPlan;
