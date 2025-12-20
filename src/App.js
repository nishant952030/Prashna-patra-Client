import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import ProtectedNavigation from "./components/ProtectedRoute";

function App() {
  return (
    <ProtectedNavigation>
      <ToastContainer position="top-center" autoClose={3000} />
      {/* App shell: full-height column */}
      <div className="flex flex-col h-screen w-screen bg-slate-900 overflow-hidden">
        {/* Fixed-height navbar at top */}
        <Navbar />

        {/* Scrollable content area below navbar */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <Analytics />
      </div>
    </ProtectedNavigation>
  );
}

export default App;
