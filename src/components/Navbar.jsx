import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PricingPage from "./Freemium.jsx";
import { logout } from "../../src/redux/slice.js";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { motion, AnimatePresence } from "framer-motion";
 
const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
                    method: "POST",
                    credentials: "include"  
                });

                
                localStorage.removeItem("user");
                sessionStorage.clear();

                dispatch(logout());
                navigate("/", { replace: true });
                window.location.reload(); 
            } catch (error) {
                console.error("Logout failed", error);
            }
        }
    };

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (user?.planType === "premium") {
            setIsExpired(user?.planExpiry < Date.now());
        }
    }, [user?.planExpiry, user?.planType]);

    return (
        <nav className="z-30 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 shadow-lg w-full h-16">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide text-orange-600">
                    Prashn Patra
                </Link>

                {/* Hamburger Menu (Mobile) */}
                <button
                    className="lg:hidden text-white p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6">
                    {isLoggedIn ? (
                        <>
                            {user?.planType === "premium" ? (
                                isExpired ? (
                                    <button
                                        className="px-5 py-2 rounded font-semibold bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        Upgrade
                                    </button>
                                ) : (
                                    <span className="px-5 py-2 rounded font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg border border-yellow-500 animate-pulse">
                                        👑 Premium
                                    </span>
                                )
                            ) : (
                                <button
                                    className="px-5 py-2 rounded font-semibold bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Upgrade
                                </button>
                            )}

                            <Link to="/home" className="">Home</Link>

                            {/* Profile Image */}
                            <button>
                                <img
                                    src={user?.profilePicture || "/default-avatar.png"}
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
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}  // Start hidden & move down
                        animate={{ opacity: 1, y: 0 }}  // Fade in & slide down
                        exit={{ opacity: 0, y: -20 }}  // Fade out & slide up
                        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                        className="lg:hidden absolute top-16 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-md flex flex-col items-center py-6 space-y-5"
                    >
                        {isLoggedIn ? (
                            <>
                                {/* Premium or Upgrade Button */}
                                {user.planType === "premium" ? (
                                    <motion.span
                                        className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg border border-yellow-500 flex items-center space-x-2"
                                        animate={{ scale: [1, 1.1, 1] }} // Slight bounce effect
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        👑 Premium Member
                                    </motion.span>
                                ) : (
                                    <motion.button
                                        className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setOpenModal(true)}
                                    >
                                        Upgrade to Premium 🚀
                                    </motion.button>
                                )}

                                {/* Navigation Links */}
                                <Link to="/home" className="text-lg text-white hover:text-yellow-400">
                                    🏠 Home
                                </Link>

                                {/* User Profile */}
                                <motion.button className="flex items-center space-x-2" whileHover={{ scale: 1.1 }}>
                                    <img
                                        src={user?.profilePicture || "/default-avatar.png"}
                                        alt="User Profile"
                                        className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-lg"
                                    />
                                    <span className="text-white text-lg">{user?.name || "User"}</span>
                                </motion.button>

                                {/* Logout Button */}
                                <motion.button
                                    onClick={handleLogout}
                                    className="px-6 py-2 flex items-center space-x-2 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-md"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    🚪 Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                    <Link
                                        to="/login"
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-full text-white"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white"
                                    >
                                        Sign Up
                                    </Link>

                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Upgrade Modal */}
            {openModal && <PricingPage onClose={() => setOpenModal(false)} />}
        </nav>
    );
};

export default Navbar;
