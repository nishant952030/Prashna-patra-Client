import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./TotalTest";
import TestForm from "./TestForm";
import Instructions from "./Instructions"; // Import the new Instructions component

const TestCreationForm = () => {
    const location = useLocation();

    return (
        <div className="h-full bg-gray-900 text-white flex">
            <Sidebar />
            <div className="flex-1 p-6">
                {location.pathname === "/home" ? <Instructions /> : <Outlet />}
            </div>
        </div>
    );
};

export default TestCreationForm;
