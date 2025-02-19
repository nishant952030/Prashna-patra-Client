import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
// Update the path based on your project structure
const {logout}=require("../../src/redux/slice.js")

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout())
            navigate("/", { replace: true });
        }
    };
    return (
        <nav className=" z-30 bg-gradient-to-r lg:px-80 md:px-24 px-3 from-gray-900 to-gray-700 text-white py-4 flex items-center justify-between shadow-lg  w-full">
            {/* Logo / Website Name */}
            <div className="text-2xl font-bold tracking-wide text-orange-600">
                <Link to="/">Prashn Patra</Link>
            </div>
            <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/home" className="mr-4 pt-2">Home</Link>
                        <button className="">
                            <img
                                src={user.profilePicture}
                                alt=""
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                        </button>
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-3">
                        <Link to="/login" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">Login</Link>
                        <Link to="/signup" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
