import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import  googeLogo  from "../../assets/google(2).png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "../../redux/slice";
// Firebase Config (use environment variables in production)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log(idToken)

            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/googleAuth`, {
                idToken,
            },{withCredentials:true});
            if (response.data.success) {
                    dispatch(setUser(response.data.user))
                    dispatch(setIsLoggedIn(true))
                    navigate('/home')
                }
            console.log("User authenticated successfully:", response.data);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("❌ Login Failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h2 className="text-3xl font-bold mb-6">Login</h2>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center px-6 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition"
            >
                <img
                    src={googeLogo}
                    alt=""
                    className="w-6 h-6 mr-2"
                />
                {loading?"signing Up":"Sign up"}
            </button>
        </div>
    );
};

export default Login;
