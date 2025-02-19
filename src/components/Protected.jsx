import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const isTestOn = useSelector((state) => state.questions.isTestOn);
    return isTestOn ? element : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
