import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setUser } from "../redux/slice";
import { ClipLoader } from "react-spinners";
import { setModalOpen } from "../redux/unauth";
import { toast } from "react-toastify";
import { Table } from "lucide-react";

const TestSubmission = () => {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confetti, setConfetti] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // Confetti effect on successful submission
    useEffect(() => {
        // Show confetti for 3 seconds
        setConfetti(true);
        const timer = setTimeout(() => {
            setConfetti(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Login handler
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError(null);

            // Google authentication
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Backend authentication
            const response = await axios.post(
                `${process.env.REACT_APP_AUTH_URL}/googleAuth`,
                { idToken },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Account Created Successfully");

                try {
                    const subject = await axios.post(
                        `${process.env.REACT_APP_UNAUTH_URL}/create-subject`,
                        {},
                        { withCredentials: true }
                    );

                    if (subject.data.message === "exists" || subject.data.success) {
                        const subjectId = subject.data.subject._id;
                        toast.success("Subject Created Successfully");

                        const questionsArray = questionArray();
                        console.log(questionsArray);

                        try {
                            const testData = JSON.parse(localStorage.getItem("testData"))?.config;
                            console.log("test data", testData);

                            const test = await axios.post(
                                `${process.env.REACT_APP_UNAUTH_URL}/create-test/${subjectId}`,
                                { testData, questionsArray },
                                { withCredentials: true }
                            );

                            if (test.data.success) {
                                toast.success("Test Created Successfully");
                            } else {
                                toast.error("All attempts exhausted. Please Upgrade");
                            }
                        } catch (error) {
                            console.error("Test Creation Error:", error);
                        }

                        // Move navigation here, ensuring subjectId is defined
                        navigate(`/home/subject/${subjectId}`);
                    }
                } catch (e) {
                    console.error("Subject Creation Error:", e);
                }

                dispatch(setUser(response.data.user));
                dispatch(setIsLoggedIn(true));
                dispatch(setModalOpen(false));
            } else {
                setError("Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error("❌ Login Failed:", error);
            setError(
                error.response?.data?.message || "Failed to log in. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };


    const questionArray = () => {
        const pendingTestData = JSON.parse(localStorage.getItem("pendingTestAttempt")) || [];
        const chosenAnswerQuestionsArray = pendingTestData?.chosenAnswerQuestions
        const correctAnswersQuestionsArray = pendingTestData?.correctAnswersQuestions;

        // Merge the arrays
        const mergedQuestions = chosenAnswerQuestionsArray.map((chosenQuestion) => {
            const correctQuestion = correctAnswersQuestionsArray.find(
                (correct) => correct.question === chosenQuestion.question
            );

            return {
                question: chosenQuestion.question,
                options: chosenQuestion.options,
                correctAnswer: correctQuestion ? correctQuestion.correctAnswer : null,
                userAnswer: chosenQuestion?.userAnswer,
            };
        });

        return mergedQuestions;

    }




    const handleClose = () => {
        dispatch(setModalOpen(false));
        setIsOpen(false)
    };

    // If dialog is closed, don't render anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 top-16 flex items-center justify-center bg-gradient-to-b from-black to-gray-900 z-50">
            {confetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* This is where the confetti animation would be rendered */}
                    {Array(50).fill().map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}px`,
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                                borderRadius: '50%',
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl max-w-md w-full text-center transform transition-all duration-500 hover:scale-105 relative">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Close dialog"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="mb-6">
                    {/* Success icon */}
                    <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-green-400">Test Submitted!</h2>
                    <p className="mt-4 text-gray-300 text-lg">
                        Great job completing your test! Log in now to view your detailed score and performance analysis.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900 bg-opacity-50 text-red-200 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300 disabled:opacity-70 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <ClipLoader color={"white"} size={20} />
                            <span className="ml-2">Logging in...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login with Google to See Results
                        </>
                    )}
                </button>

                <p className="mt-4 text-gray-400 text-sm">
                    Your test results will be available immediately after login
                </p>
            </div>
        </div>
    );
};

export default TestSubmission;

