import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PricingPage from "./Freemium.jsx";
import { logout } from "../redux/slice.js";
import { Menu, X, Home, LogOut, Crown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
                    method: "POST",
                    credentials: "include",
                });

                localStorage.removeItem("user");
                sessionStorage.clear();

                dispatch(logout());
                navigate("/", { replace: true });
            } catch (error) {
                console.error("Logout failed", error);
            }
        }
    };

    useEffect(() => {
        if (user?.planType === "premium") {
            setIsExpired(user?.planExpiry < Date.now());
        }
    }, [user?.planExpiry, user?.planType]);

    return (
        <nav className="w-full  h-16 sticky top-0 z-10 backdrop-blur-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-orange-500/20 shadow-2xl shadow-orange-500/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-0 h-full flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0"
                >
                    <Link
                        to="/"
                        className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                    >
                        Prashn Patra
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                    {isLoggedIn ? (
                        <>
                            {/* Premium/Upgrade Button */}
                            {user?.planType === "premium" ? (
                                isExpired ? (
                                    <motion.button
                                        onClick={() => setOpenModal(true)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-700 text-white shadow-lg border border-purple-500/50 hover:shadow-purple-500/50 transition"
                                    >
                                        🚀 Upgrade Plan
                                    </motion.button>
                                ) : (
                                    <div className="px-5 py-2.5 rounded-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/50 border border-yellow-300/70 flex items-center gap-2 animate-pulse">
                                        <Crown size={20} />
                                        Premium
                                    </div>
                                )
                            ) : (
                                <motion.button
                                    onClick={() => setOpenModal(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 border border-orange-400/50 transition"
                                >
                                    <Zap size={18} className="inline mr-1" />
                                    Upgrade
                                </motion.button>
                            )}

                            {/* Home Link */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/home"
                                    className="px-4 py-2.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/15 transition border border-transparent hover:border-white/20 font-medium flex items-center gap-2"
                                >
                                    <Home size={20} />
                                    Home
                                </Link>
                            </motion.div>

                            {/* Profile Image */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button className="w-11 h-11 rounded-full border-2 border-orange-500 overflow-hidden hover:border-orange-400 transition hover:shadow-orange-500/50 hover:shadow-lg">
                                    <img
                                        src={user?.profilePicture || "/default-avatar.png"}
                                        alt="User Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            </motion.div>

                            {/* Logout Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30 border border-red-500/50 transition flex items-center gap-2"
                            >
                                <LogOut size={18} />
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 transition hover:border-white/50"
                                >
                                    Login
                                </Link>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/signup"
                                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/30 border border-orange-400/50 transition"
                                >
                                    Sign Up
                                </Link>
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Hamburger Menu (Mobile) */}
                <motion.button
                    className="lg:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {menuOpen ? (
                        <X size={26} className="text-white" />
                    ) : (
                        <Menu size={26} className="text-white" />
                    )}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden backdrop-blur-xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border-b border-orange-500/20 shadow-xl"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {isLoggedIn ? (
                                <>
                                    {/* Premium Status/Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {user?.planType === "premium" ? (
                                            <div
                                                className={`w-full px-4 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow-lg border ${isExpired
                                                        ? "bg-gradient-to-r from-purple-600 to-blue-700 text-white border-purple-500/50"
                                                        : "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 border-yellow-300/70 animate-pulse"
                                                    }`}
                                            >
                                                <Crown size={20} />
                                                {isExpired ? "Plan Expired - Upgrade" : "Premium Member"}
                                            </div>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setOpenModal(true);
                                                    setMenuOpen(false);
                                                }}
                                                className="w-full px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 border border-orange-400/50 flex items-center justify-center gap-2"
                                            >
                                                <Zap size={20} />
                                                Upgrade to Premium
                                            </motion.button>
                                        )}
                                    </motion.div>

                                    {/* Home Link */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <Link
                                            to="/home"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 transition flex items-center justify-center gap-2"
                                        >
                                            <Home size={20} />
                                            Home
                                        </Link>
                                    </motion.div>

                                    {/* Divider */}
                                    <div className="h-px bg-white/10 my-2" />

                                    {/* User Profile Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-col items-center gap-3 py-3"
                                    >
                                        <img
                                            src={user?.profilePicture || "/default-avatar.png"}
                                            alt="User Profile"
                                            className="w-16 h-16 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/30"
                                        />
                                        <p className="text-white font-bold text-center">
                                            {user?.name || "User"}
                                        </p>
                                    </motion.div>

                                    {/* Logout Button */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30 border border-red-500/50 flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Link
                                            to="/login"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 transition text-center"
                                        >
                                            Login
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <Link
                                            to="/signup"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/30 border border-orange-400/50 transition text-center"
                                        >
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upgrade Modal */}
            {openModal && <PricingPage onClose={() => setOpenModal(false)} />}
        </nav>
    );
};

export default Navbar;
