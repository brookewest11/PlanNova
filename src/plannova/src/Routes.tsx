import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './modules/Home'; 
import MealPlan from './modules/MealPlan';
import List from './modules/List';
import FitnessTracker from './modules/FitnessTracker';
import Login from './modules/Login'

function AppRoutes() {
return (
    <Routes>
         <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/meal-planning" element={<MealPlan />} /> 
        <Route path="/list" element={<List />} /> 
        <Route path="/fitness-tracker" element={<FitnessTracker />} /> 
    </Routes>
    );
}

export default AppRoutes;