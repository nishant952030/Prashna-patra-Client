import { Check, X } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const PricingPage = ({ onClose }) => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free Plan",
            price: "0",
            period: "month",
            description: "Perfect for getting started",
            features: ["Basic test generation", "Limited AI insights", "5 tests per month"],
            missingFeatures: ["Advanced analytics", "Unlimited tests", "Priority support"],
            buttonText: "Get Started",
            isPremium: false,
            icon: "🚀",
        },
        {
            name: "Premium Plan",
            originalPrice: "99",
            price: "49",
            discount: "50%",
            period: "month",
            description: "For students who need more",
            features: [
                "Unlimited test generation",
                "Advanced AI insights",
                "Detailed analytics",
                "Priority support",
            ],
            buttonText: "Upgrade Now",
            isPremium: true,
            icon: "⭐",
        },
    ];

    const handleClick = (text) => {
        if (text === "Get Started") {
            navigate("/home");
        } else {
            navigate("/payment");
        }
        onClose();
    };

    // 🔒 Lock background scroll
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = original);
    }, []);

    // ⎋ Close on ESC
    useEffect(() => {
        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm overflow-hidden"
                onClick={onClose}
            />

            {/* Modal Container - Scrollable */}
            <div className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden flex items-start justify-center p-4 pt-8 sm:pt-0 sm:items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-2xl bg-gradient-to-br from-[#0f1419] to-slate-950 rounded-xl p-4 sm:p-6 md:p-8 border border-orange-500/30 shadow-2xl shadow-orange-500/20 my-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-orange-500/20 transition-colors z-10"
                    >
                        <X className="text-orange-400" size={24} />
                    </motion.button>

                    {/* Header */}
                    <div className="relative z-10 mb-6 sm:mb-8 pt-6 sm:pt-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2">
                            Choose Your Plan
                        </h1>
                        <p className="text-center text-gray-400 text-sm sm:text-base">
                            Unlock your full potential and study smarter
                        </p>
                    </div>

                    {/* Plans Grid - Stack on Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10 mb-6">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ translateY: -4 }}
                                className={`p-4 sm:p-6 rounded-lg border transition-all relative overflow-hidden group ${plan.isPremium
                                        ? "border-orange-500/60 bg-gradient-to-br from-orange-600/20 to-slate-900 shadow-lg shadow-orange-500/20"
                                        : "border-orange-500/30 bg-[#0a0e14]/60 hover:border-orange-500/50"
                                    }`}
                            >
                                {/* Glow effect for premium */}
                                {plan.isPremium && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                )}

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{plan.icon}</div>

                                    {/* Badges */}
                                    {plan.isPremium && (
                                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-orange-500/30 text-orange-300 text-xs font-semibold px-2 py-1 rounded-full border border-orange-500/50"
                                            >
                                                ✨ Popular
                                            </motion.span>
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.25 }}
                                                className="bg-green-500/30 text-green-300 text-xs font-semibold px-2 py-1 rounded-full border border-green-500/50"
                                            >
                                                Save {plan.discount}
                                            </motion.span>
                                        </div>
                                    )}

                                    {/* Title & Description */}
                                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                                        {plan.name}
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                                        {plan.description}
                                    </p>

                                    {/* Pricing */}
                                    <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 bg-slate-900/50 rounded-lg border border-orange-500/20">
                                        <div className="flex items-baseline gap-1 mb-1">
                                            <span className="text-xl sm:text-2xl font-bold text-white">
                                                ₹{plan.price}
                                            </span>
                                            <span className="text-gray-400 text-xs sm:text-sm">
                                                /{plan.period}
                                            </span>
                                        </div>
                                        {plan.originalPrice && (
                                            <div className="text-xs text-gray-500 line-through">
                                                ₹{plan.originalPrice}/{plan.period}
                                            </div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                                        {plan.features.map((f, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + idx * 0.05 }}
                                                className="flex gap-2 text-xs sm:text-sm text-gray-300"
                                            >
                                                <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check size={12} className="text-green-400" />
                                                </div>
                                                {f}
                                            </motion.li>
                                        ))}
                                        {plan.missingFeatures?.map((f, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay:
                                                        0.3 +
                                                        plan.features.length * 0.05 +
                                                        idx * 0.05,
                                                }}
                                                className="flex gap-2 text-xs sm:text-sm text-gray-500 line-through opacity-60"
                                            >
                                                <div className="w-4 h-4 rounded-full bg-gray-700/50 border border-gray-600/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <X size={12} className="text-gray-600" />
                                                </div>
                                                {f}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleClick(plan.buttonText)}
                                        className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all ${plan.isPremium
                                                ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-500/30"
                                                : "bg-orange-600/50 hover:bg-orange-600/70 text-white border border-orange-500/30"
                                            }`}
                                    >
                                        {plan.buttonText} →
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-gray-500 text-xs relative z-10 pt-4 sm:pt-6 border-t border-orange-500/20"
                    >
                        7-day free trial. Cancel anytime, no questions asked.
                    </motion.p>
                </motion.div>
            </div>
        </>,
        document.body
    );
};

export default PricingPage;
