import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";

import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import ProtectedNavigation from "./components/ProtectedRoute";


function App() {

  return (
    <ProtectedNavigation>
      <div className="App max-h-screen">
        <Navbar/>
        <Outlet/>
      </div>
    </ProtectedNavigation>
  );
}

export default App;
