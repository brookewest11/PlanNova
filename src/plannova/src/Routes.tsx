import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./modules/Home";
import MealPlan from "./modules/MealPlan";
import List from "./modules/List";
import FitnessTracker from "./modules/FitnessTracker";
import Login from "./modules/Login";
import NewUser from "./modules/NewUser";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/meal-planning" element={<MealPlan />} />
      <Route path="/list" element={<List />} />
      <Route path="/fitness-tracker" element={<FitnessTracker />} />
      <Route path="/new-user" element={<NewUser />} />
    </Routes>
  );
}

export default AppRoutes;
