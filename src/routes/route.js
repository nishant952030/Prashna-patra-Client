import App from "../App";
import LandingPage from "../components/LandingPage";
import TestOverview from "../components/testPages/testOverview";
import Login from "../components/auth/Login";
import SignupForm from "../components/auth/signup";
import Home from "../components/Home";
import Main from "../components/testPages/Main.jsx";
import TestCreationForm from "../components/Home";
import TestForm from "../components/TestForm.jsx";
import ProtectedRoute from "../components/Protected"; // Import the ProtectedRoute wrapper
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App will contain the Navbar and Outlet
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "home",
                element: <TestCreationForm />,
                children: [
                    {
                        path: "subject/:subjectId",
                        element: <TestOverview />,
                    },
                ],
            },
            {
                path: "/createTest/:subjectId",
                element: <TestForm />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignupForm />,
            },
            {
                path: "attemptTest",
                element: <ProtectedRoute element={<Main />} />, // Protect this route
            },
        ],
    },
]);

export default router;
