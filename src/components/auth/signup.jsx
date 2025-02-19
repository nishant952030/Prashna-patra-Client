import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "../../redux/slice";
import { useNavigate } from "react-router-dom";

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

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    console.log(" this is from the signup page",process.env.REACT_APP_AUTH_URL)
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log(idToken)
           
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/googleAuth`, {
                idToken,
            }, { withCredentials: true });
            if (response.data.success) {
                dispatch(setUser(response.data.user));
                dispatch(setIsLoggedIn(true))
                navigate("/home")
             }
            console.log("User authenticated successfully:", response.data);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="p-6 rounded-lg shadow-md w-full max-w-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Sign Up with Google</h2>
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="p-2 bg-red-500 text-white rounded flex items-center justify-center w-full"
                >
                    {loading ? "Processing..." : "Sign in with Google"}
                </button>
            </div>
        </div>
    );
};

export default SignupForm;
