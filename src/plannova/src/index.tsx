// Name: Index
// Purpose / what code does: This component intializes how app is rendered and navigation by passing off control to Router 
// Programmers: Gabi Kruger, Brooke West, Emily Proctor, Kenadi Krueger, Nathan Mignot
// Date created: 10/10/2023
// Date revised: 10/10/2023
  // Major Revisions:
  //Date: 10/10/24 Author: Brooke West
  //Modification: Created index and router

  //needed imports 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router} from 'react-router-dom'; 
import "./index.css";
import AppRoutes from './Routes';
import Home from "./modules/Home";
import { UserProvider } from "./modules/User";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLLIElement
);
root.render(
  <React.StrictMode>
    {/* Gives Router control of navigation between pages */}
    <Router> 
    <UserProvider>
    {/* Uses router function from Routes.tsx  */}
    <AppRoutes/>
      </UserProvider>
    </Router>
  </React.StrictMode>
);

