import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hasRun = useRef(false); // Track if the API call has already run

    const getQueryParam = (param) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(param);
    };

    const paymentId = getQueryParam("payment_id") || null;
    const orderId = getQueryParam("order_id") || null;
    const amount = getQueryParam("amount") || null;
    const success = getQueryParam("success") || "false";

    const [isSuccess, setIsSuccess] = useState(success === "true");
    const dispatch = useDispatch();
    useEffect(() => {
        if (!hasRun.current && isSuccess && paymentId && orderId && amount) {
            hasRun.current = true; // Mark that API call has been made

            const updateUserStatus = async () => {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_PAYMENT_URL}/payment-success`,
                        { paymentId, orderId, amount },
                        { withCredentials: true }
                    );
                 
                    if (response.data.success) {
                        dispatch(setUser(response.data.user));   
                    }
                } catch (error) {
                    console.error("❌ Error updating user status:", error);
                }
            };

            updateUserStatus();
        }
    }, [isSuccess, paymentId, orderId, amount]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
            {isSuccess && (
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold mb-6 transition-all">
                    🎉 Enjoy your premium membership!
                </div>
            )}

            <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md text-center">
                <div className="flex justify-center">
                    <svg
                        className="w-16 h-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-green-400 mt-4">
                    {isSuccess ? "Payment Successful 🎉" : "Payment Failed ❌"}
                </h1>
                <p className="text-gray-400 mt-2">
                    {isSuccess
                        ? "Thank you for your payment! You are now a premium user."
                        : "Something went wrong with your payment."}
                </p>

                <div className="mt-6 p-4 bg-gray-700 rounded-lg text-gray-300 text-sm">
                    <p><strong>Payment ID:</strong> {paymentId}</p>
                    <p><strong>Order ID:</strong> {orderId}</p>
                    <p><strong>Amount Paid:</strong> ₹{amount}</p>
                </div>

                <button
                    onClick={() => navigate("/home", { replace: true })}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
