import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
 
import ProtectedNavigation from "./components/ProtectedRoute";


function App() {

  return (
    <ProtectedNavigation>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="App max-h-screen">
        <Navbar/>
        <Outlet />

      </div>
    </ProtectedNavigation>
  );
}

export default App;
