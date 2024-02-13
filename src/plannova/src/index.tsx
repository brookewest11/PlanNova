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
    <Router>
    <UserProvider>
    <AppRoutes/>
      </UserProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
