// Name: Router
// Purpose / what code does: This component controls navigation between the home, fitness tracker, meal planner, and list pages allowing for easy traversal from page to page 
// Programmers: Gabi Kruger, Brooke West, Emily Proctor, Kenadi Krueger, Nathan Mignot
// Date created: 10/10/2023
// Date revised: 2024
  // Major Revisions:
  //Date: 10/10/24 Author: Brooke West
  //Modification: Created Router setting intial page to Home page, added nav bar so when each respective button is clicked you are taken to that page 
  //Date: 11/27/23 Author: Brooke West
  //Modification: Added rough draft of Login page, changing landing page to login page for the router 

//needed imports 
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./modules/Home";
import MealPlan from "./modules/MealPlan";
import List from "./modules/List";
import FitnessTracker from "./modules/FitnessTracker";
import Login from "./modules/Login";
import NewUser from "./modules/NewUser";

function AppRoutes() { // Router function to control different paging 
  return (
    <Routes>
      {/* sets initial landing page to the login screen */}
      <Route path="/" element={<Login/>} />  
      {/* following sets the navigation bar functionality  */}
      <Route path="/home" element={<Home />} />
      <Route path="/meal-planning" element={<MealPlan />} />
      <Route path="/list" element={<List />} />
      <Route path="/fitness-tracker" element={<FitnessTracker />} />
      {/* navigates to new user sign up page from login screen */}
      <Route path="/new-user" element={<NewUser />} />
    </Routes>
  );
}

export default AppRoutes;
