import App from "../App";
import LandingPage from "../components/LandingPage";
import TestOverview from "../components/testPages/testOverview";
import Login from "../components/auth/Login";
import SignupForm from "../components/auth/signup";

import Main from "../components/testPages/Main.jsx";
import TestCreationForm from "../components/Home";
import TestForm from "../components/TestForm.jsx";
import ProtectedRoute from "../components/Protected"; // Import the ProtectedRoute wrapper
import PrivacyPolicy from "../components/termsAndConditions/PrivacyPolicy.jsx";
import ContactUs from "../components/termsAndConditions/ContactUs.jsx";
import RefundPolicy from "../components/termsAndConditions/RefundPolicy.jsx";
import ShippingOlicy from "../components/termsAndConditions/ShippingOlicy.jsx";
import TakePayment from "../components/RazorPay.jsx";
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
                path: "payment",
                element: <TakePayment />,
            },
            {
                path: "signup",
                element: <SignupForm />,
            },
            {
                path: "attemptTest",
                element: <ProtectedRoute element={<Main />} />, // Protect this route
            },
            {
                path: "/contact-us",
                element:<ContactUs/>
            },
            {
                path: "/terms-and-condition",
                element:<PrivacyPolicy/>
            },
            {
                path: "/refund-policy",
                element:<RefundPolicy/>
            },
            {
                path: "/shipping-policy",
                element:<ShippingOlicy/>
            },
        ],
    },
]);

export default router;
