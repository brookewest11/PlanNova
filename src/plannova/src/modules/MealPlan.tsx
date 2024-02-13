import React, { useState } from "react";
import "./MealPlan.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";
import { useUser } from "./User";

declare module "*.png"; 

function MealPlan() {  //creates MealPlan function 
  const numberOfInputBoxes = 21; // 3 meals a day * 7 days a week 
  const { userName } = useUser();
  console.log('userName from useUser:', userName);
  const initialInputValues = Array.from(
    { length: numberOfInputBoxes },
    () => ""
  ); //intialized with an array of empty strings (size 21)

  const [inputValues, setInputValues] = useState(initialInputValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
          <div className="nav-buttons">
            <Link to="/list" className="links">
              lists
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
      <hr className="mealline" />
      <div>
        {/* heading and creates 7 meal boxes (each meal box has 3 input text boxes that change as you type in them and hold their value) */}
        <h2 className="user-title">{`${userName}'s meals`}</h2>
      </div>
      <div className="meal-grid-container2">
        {/* Monday */}
        <div className="grid-item2">
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Monday</div>
            <div style={{ margin: '10px' }}>
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
              <div key={1}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={2}>
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
                {/* Tuesday */}
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Tuesday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={3}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[3]}
                  onChange={(e) => handleInputChange(e, 3)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={4}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[4]}
                  onChange={(e) => handleInputChange(e, 4)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={5}>
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
        {/* Wednesday */}
        <div className="grid-item2">
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Wednesday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={6}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[6]}
                  onChange={(e) => handleInputChange(e, 6)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={7}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[7]}
                  onChange={(e) => handleInputChange(e, 7)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={8}>
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
        {/* Thursday */}
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Thursday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={9}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[9]}
                  onChange={(e) => handleInputChange(e, 9)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={10}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[10]}
                  onChange={(e) => handleInputChange(e, 10)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={11}>
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
        {/* Friday */}
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Friday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={12}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[12]}
                  onChange={(e) => handleInputChange(e, 12)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={13}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[13]}
                  onChange={(e) => handleInputChange(e, 13)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={14}>
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
        {/* Saturday */}
        <div className="grid-item2">
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Saturday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={15}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[15]}
                  onChange={(e) => handleInputChange(e, 15)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={16}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[16]}
                  onChange={(e) => handleInputChange(e, 16)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={17}>
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
        {/* Sunday */}
          <div className="mealbox">
            <div style={{ fontSize: '30px' }}>Sunday</div>
            <div style={{ margin: '10px' }}>
              <br></br>
              breakfast
              <div key={18}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[18]}
                  onChange={(e) => handleInputChange(e, 18)}
                  placeholder="add meal..."
                />
              </div>
              lunch
              <div key={19}>
                <input
                  className="input"
                  type="text"
                  value={inputValues[19]}
                  onChange={(e) => handleInputChange(e, 19)}
                  placeholder="add meal..."
                />
              </div>
              dinner
              <div key={20}>
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
