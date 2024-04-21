import React, { useState, useEffect } from "react";
import "./MealPlan.css";
import { Link } from "react-router-dom";
import logopic from "./logostars2.png";
import { useUser } from "./User";

declare module "*.png"; 

function MealPlan() {  //creates MealPlan function 
  const numberOfInputBoxes = 21; // 3 meals a day * 7 days a week 
  const { userName } = useUser();
  //console.log('userName from useUser:', userName);
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


  //fetches specific user lists based on user
  useEffect(() => {
    fetchUserMeals();
  }, []);

  // function for fetching specific user lists based on user
  const fetchUserMeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-user-meals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      const data = await response.json();
      // if success
      if (response.ok) {
        // set the current list with list stored in backend for user
        setInputValues(data.meals);
      } else {
        // Handle error
        console.error("Failed to fetch user meals:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user meals:", error);
    }
  };


  //function used for saving meal plans back to the backend
  //input: nothing
  //output: meal plan data saved to our mongoDB database
  const saveMealPlan = async () => {
    // saves mealPlanData as the inputVales array of strings which is used to input the different foods used in the meal plan
    // this is just used to store the input values into the "meals" section in our database
    const mealPlanData = {
      meals: inputValues,
    };

    try {
      // send the updated meal plan to the backend
      const response = await fetch("http://localhost:5000/update-meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlanData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Meal plan saved successfully:", data);
        // Handle success if needed
      } else {
        console.error("Failed to save meal plan:", data.error);
        // Handle failure if needed
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
      // Handle error if needed
    }
  };

    // Function to delete all meals
    const deleteAllMeals = () => {
      const nullInputValues = Array(numberOfInputBoxes).fill(null);
      setInputValues(nullInputValues);
      // Save the updated meal plan with null values to the backend
      saveMealPlan();
    };


  return (
    <>
      <div className="grid-container">
         <div className="grid-item">
           {/* handles title and logo image */}
           <div className="logo_container_list">
             <img src={logopic} className="logopic_list" />
             <div className="plannnova" style={{ color: 'black' }}>PlanNova</div>
           </div>
         </div>
         <div className="grid-item">
           {/* navigation bar */}
           <div className="nav-buttons">
             <Link to="/meal-planning" className="links" style={{ color: '#883955' }}>
               meal planning
             </Link>
             <Link to="/fitness-tracker" className="links" style={{ color: '#883955' }}>
               fitness tracker
             </Link>
             <Link to="/list" className="links" style={{ color: '#883955' }}>
               lists
             </Link>
             <Link to="/home" className="links" style={{ color: '#883955' }}>
               home
             </Link>
             <Link to="/" className="links" style={{ color: '#883955' }}>
               logout
             </Link>
           </div>
         </div>
       </div>

       <hr className="line" style={{ color: '#883955' }}/>
      <div>
        {/* heading and creates 7 meal boxes (each meal box has 3 input text boxes that change as you type in them and hold their value) */}
        <h2 className="user-title">Meal Planner</h2>
      </div>
      <div className="meal-grid-container2">
        {/* Monday */}
        <div className="grid-item2">
          <div className="mealbox">
            <div className='day-titles'>Monday</div>
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
            <div className='day-titles'>Tuesday</div>
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
            <div className='day-titles'>Wednesday</div>
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
            <div className='day-titles'>Thursday</div>
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
            <div className='day-titles'>Friday</div>
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
            <div className='day-titles'>Saturday</div>
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
            <div className='day-titles'>Sunday</div>
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
            {/* Button used to save the meal plan */}
            <button className="saveMeal"
            onClick={saveMealPlan}> + save meal plan
            </button>
            {/* Delete all button */}
            <button className="deleteAll" onClick={deleteAllMeals}>
            - clear all meals
            </button>
    </>
  );
}

export default MealPlan;
