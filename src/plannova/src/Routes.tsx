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
      <Route path="/" element={<Login />} />  
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
