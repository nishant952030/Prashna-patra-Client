import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./TotalTest";
import TestForm from "./TestForm";
import Instructions from "./Instructions";
import { toast } from "react-toastify";
import Feedback from "./FeedBack";

const TestCreationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
    const openFeedback=useSelector((state)=>state.feedback.openFeedback)
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(openFeedback);
    useEffect(() => {
        if (!isLoggedIn && location.pathname !== "/") {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, location, navigate]);
    useEffect(() => {
        setIsFeedbackOpen(openFeedback)
    },[openFeedback])
    return (
        <div className="h-screen max-h-[calc(100vh-60px)] overflow-clip z-10 bg-gray-900 text-white flex">
            <Sidebar />
            <div className="flex-1 p-1 sm:p-6">
                {location.pathname === "/home" ? <Instructions /> : <Outlet />}
            </div>
            { isFeedbackOpen && <Feedback />}
        </div>
    );
};

export default TestCreationForm;
