import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PricingPage from "./Freemium.jsx"; // Ensure this is the correct path
import { logout } from "../../src/redux/slice.js"; // Correct import

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    const [upgrade, setUpgrade] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout());
            navigate("/", { replace: true });
        }
    };

    const showUpgradeButton = upgrade && window.location.pathname !== "/payment";

    return (
        <nav className="z-30 bg-gradient-to-r lg:px-80 md:px-24 px-3 from-gray-900 to-gray-700 text-white py-4 flex items-center justify-between shadow-lg w-full">
            {/* Logo / Website Name */}
            <div className="text-2xl font-bold tracking-wide text-orange-600">
                <Link to="/">Prashn Patra</Link>
            </div>

            <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        {showUpgradeButton && (
                            <button
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded text-white"
                                onClick={() => setOpenModal(true)}
                            >
                                Upgrade
                            </button>
                        )}
                        <Link to="/home" className="mr-4 pt-2">Home</Link>
                        <button>
                            <img
                                src={user?.profilePicture || "/default-avatar.png"} // Fallback image
                                alt="User Profile"
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

            {/* Upgrade Modal */}
            {openModal && <PricingPage onClose={() => setOpenModal(false)} />}
        </nav>
    );
};

export default Navbar;
