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

