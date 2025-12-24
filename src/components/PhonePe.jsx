import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Check, Lock, Zap, Shield, Clock } from 'lucide-react';
import { setUser } from '../redux/slice';
import { Navigate, useNavigate } from 'react-router-dom';

const TakePayment = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productFeatures = [
        "Unlimited AI-Generated Tests",
        "Multiple Subject Support",
        "Detailed Analysis & Reports",
        "Custom Difficulty Levels",
        "Instant Results & Analytics",
        "24/7 Customer Support"
    ];

    const priceDetails = {
        basePrice: 100,
        discount: 99,
        finalPrice:1 
    };

    const trustBadges = [
        { icon: Lock, title: "Secure Payment", desc: "256-bit encryption" },
        { icon: Zap, title: "Instant Access", desc: "Activate immediately" },
        { icon: Shield, title: "Money-back", desc: "7-day guarantee" },
        { icon: Clock, title: "24/7 Support", desc: "Always here to help" }
    ];

    const handleCheckout = async () => {
        console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);

        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_PAYMENT_URL}/razorpay/order`,
                {
                    amount: priceDetails.finalPrice,
                    currency: "INR",
                    name: user?.name || "Guest User",
                    email: user?.email || "test@example.com",
                    phone: "9520303583",
                },
                { withCredentials: true }
            );
            console.log("hello")
            const { order } = res.data;
            if (!order?.id) {
                alert("Order could not be created. Try again.");
                return;
            }
            console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: order.currency,
                    name: "Prashna Patra",
                    description: "Order payment",
                    order_id: order.id,
                    prefill: {
                        name: user?.name || "Guest User",
                        email: user?.email || "test@example.com",
                        contact: "9520303583",
                    },
                    handler: async function (response) {
                        try {
                            console.log("it is reaching here")
                            const verifyRes = await axios.post(
                                `${process.env.REACT_APP_PAYMENT_URL}/razorpay/verify`,
                                {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                },
                                { withCredentials: true }
                            );
                            console.log("it is reaching here")
                            if (verifyRes.data.success) {
                                dispatch(setUser(verifyRes.data.user));
                                alert("Payment successful!");
                                navigate("/")
                            }
                            else {
                                alert("Payment verification failed!");
                            }
                        } catch (err) {
                            console.error("Verify error:", err);
                            alert("Payment verification error!");
                        }
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            };

            script.onerror = () => {
                alert("Unable to load Razorpay. Please try again.");
            };
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-[#0f1419] to-slate-950 overflow-y-auto">
            {/* Background decorative elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Content Wrapper - Scrollable on Mobile */}
            <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-[#0f1419] to-slate-900 rounded-2xl shadow-2xl shadow-orange-500/20 overflow-hidden border border-orange-500/30"
                    >
                        {/* Product Header */}
                        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                            </div>
                            <div className="relative z-10">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Premium Plan</h1>
                                <p className="mt-2 text-sm sm:text-base text-orange-100">Unlock unlimited test generation and AI-powered learning</p>
                            </div>
                        </div>

                        {/* Content Grid - Stack on Mobile */}
                        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Features List */}
                            <motion.div variants={itemVariants}>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">What You'll Get</h2>
                                <ul className="space-y-2.5 sm:space-y-3">
                                    {productFeatures.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.08 }}
                                            className="flex items-start gap-2 sm:gap-3"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                                                <Check size={14} className="text-green-400" />
                                            </div>
                                            <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Price & Checkout */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-br from-orange-600/20 to-slate-900 p-4 sm:p-6 md:p-8 rounded-xl border border-orange-500/30 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Order Summary</h2>

                                    <div className="space-y-2.5 sm:space-y-3 mb-6">
                                        {/* Base Price */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex justify-between text-sm sm:text-base text-gray-400"
                                        >
                                            <span>Base Price</span>
                                            <span>₹{priceDetails.basePrice}</span>
                                        </motion.div>

                                        {/* Discount */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.45 }}
                                            className="flex justify-between text-sm sm:text-base text-green-400 font-semibold"
                                        >
                                            <span>Discount (50%)</span>
                                            <span>- ₹{priceDetails.discount}</span>
                                        </motion.div>

                                        {/* Divider */}
                                        <div className="border-t border-orange-500/30 pt-3 sm:pt-4 mt-3 sm:mt-4">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-white font-semibold text-sm sm:text-base">Total Price</span>
                                                <div className="text-right">
                                                    <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                                                        ₹{priceDetails.finalPrice}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                                                        for 1 year
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Trial Info */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.55 }}
                                        className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5 sm:p-3 mb-6"
                                    >
                                        <p className="text-xs sm:text-sm text-green-300">
                                            ✨ 7-day free trial included. Cancel anytime.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base text-white transition-all flex items-center justify-center gap-2 ${loading
                                            ? 'bg-gray-600 opacity-75 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/30'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            Pay Now
                                        </>
                                    )}
                                </motion.button>

                                {/* Security Info */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-3 sm:mt-4 text-xs text-gray-400 text-center"
                                >
                                    🔒 Secure payment powered by PhonePe | 256-bit SSL Encryption
                                </motion.p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
                    >
                        {trustBadges.map((badge, index) => {
                            const Icon = badge.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.08 }}
                                    whileHover={{ translateY: -4 }}
                                    className="p-3 sm:p-4 bg-[#0f1419] rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all text-center"
                                >
                                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1.5 sm:mb-2 text-orange-400" />
                                    <p className="font-semibold text-white text-xs sm:text-sm">{badge.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{badge.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-6 md:p-8 bg-[#0f1419] rounded-xl border border-orange-500/30"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Still Have Questions?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <p className="font-semibold text-orange-400 mb-1.5 sm:mb-2 text-sm sm:text-base">Can I cancel anytime?</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Yes! Cancel your subscription anytime with no questions asked within 7 days for a full refund.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-orange-400 mb-1.5 sm:mb-2 text-sm sm:text-base">What payment methods do you accept?</p>
                                <p className="text-gray-400 text-xs sm:text-sm">We accept all major payment methods including UPI, cards, and digital wallets through PhonePe.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-orange-400 mb-1.5 sm:mb-2 text-sm sm:text-base">Is my payment secure?</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Absolutely! We use 256-bit SSL encryption and PhonePe's trusted payment gateway.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-orange-400 mb-1.5 sm:mb-2 text-sm sm:text-base">Do I get instant access?</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Yes! Your premium account activates immediately after successful payment.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TakePayment;
