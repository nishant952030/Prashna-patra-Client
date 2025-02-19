// components/ProtectedNavigation.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedNavigation = ({ children }) => {
    const isTestOn = useSelector((state) => state.questions.isTestOn);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isTestOn && location.pathname !== "/attemptTest") {
            navigate("/attemptTest", { replace: true });
        }
        if (!isTestOn && location.pathname === "/attemptTest") {
            navigate("/home", { replace: true });
        }
    }, [isTestOn, location, navigate]);

    return children;
};

export default ProtectedNavigation;
