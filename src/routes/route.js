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
import TakePayment from "../components/PhonePe.jsx";
import PaymentSuccess from "../components/payments/Success.jsx";
import TestFormUnAuthorized from "../forUnauthorized/TestForm.jsx";
import TestAttemptGuest from "../forUnauthorized/Main.jsx";
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App will contain the Navbar and Outlet
        children: [
            {
                path: "/",
                element: <TestFormUnAuthorized />,
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
                path: "payment-success",
                element: <PaymentSuccess />
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
                path: "guest/attemptTest",
                element: <ProtectedRoute element={<TestAttemptGuest />} />, // Protect this route
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
            {
                path: "/terms-and-condition",
                element: <PrivacyPolicy />
            },
            {
                path: "/refund-policy",
                element: <RefundPolicy />
            },
            {
                path: "/shipping-policy",
                element: <ShippingOlicy />
            },
            {
                path: "/solutions",
                element: <Main />
            },
            {
                path: "landing-page",
                element:<LandingPage/>
            }
        ],
    },
]);

export default router;
