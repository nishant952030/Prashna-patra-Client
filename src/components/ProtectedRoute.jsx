// components/ProtectedNavigation.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedNavigation = ({ children }) => {
    const isTestOn = useSelector((state) => state.questions.isTestOn);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();
    const navigate = useNavigate();
    const path = isLoggedIn ? "/attemptTest" : "/guest/attemptTest";

    useEffect(() => {
        // The issue was in this condition - using OR (||) instead of AND (&&)
        if (isTestOn && location.pathname !== path) {
            navigate(path, { replace: true });
        }

        if (!isTestOn && (location.pathname === "/attemptTest" || location.pathname === "/guest/attemptTest")) {
            if (location.pathname === "/guest/attemptTest") navigate("/",{replace:true})
            else navigate("/home", { replace: true });
        }
    }, [isTestOn, location, navigate, path, isLoggedIn]);

    return children;
};

export default ProtectedNavigation;