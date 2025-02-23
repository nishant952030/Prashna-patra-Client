import { Check, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingPage = ({ onClose }) => {
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
        },
        {
            name: "Premium Plan",
            originalPrice: "99",
            price: "49",
            discount: "50%",
            period: "month",
            description: "For professionals who need more",
            features: [
                "Unlimited test generation",
                "Advanced AI insights",
                "Detailed analytics",
                "Priority support",
            ],
            buttonText: "Upgrade Now",
            isPremium: true,
        },
    ];
    const navigate=useNavigate()

    const buttonAction = (text) => {
        if (text === "Get Started") {
            navigate("/home");
            return;
        }
        onClose()
        navigate("/payment");
     }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-4xl relative border border-gray-800">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-800 transition-colors"
                    >
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
                    <p className="text-gray-400 mt-2">Select the perfect plan for your needs</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-6 transition-all hover:shadow-xl ${plan.isPremium
                                    ? "bg-gray-800 border-2 border-blue-500"
                                    : "bg-gray-800 border border-gray-700"
                                }`}
                        >
                            {plan.isPremium && (
                                <div className="space-y-2">
                                    <span className="bg-blue-500/20 text-blue-400 text-sm font-medium px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                    <span className="bg-green-500/20 text-green-400 text-sm font-medium px-3 py-1 rounded-full ml-2">
                                        Save {plan.discount}
                                    </span>
                                </div>
                            )}

                            <div className="mt-4">
                                <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                                <p className="text-gray-400 mt-2">{plan.description}</p>
                            </div>

                            <div className="mt-4 flex items-baseline">
                                <span className="text-lg font-bold text-white mr-1">₹</span>
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-gray-400 ml-2">/{plan.period}</span>
                                {plan.originalPrice && (
                                    <span className="ml-3 text-gray-500 line-through">
                                        ₹{plan.originalPrice}/{plan.period}
                                    </span>
                                )}
                            </div>

                            <ul className="mt-6 space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check size={18} className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                                {plan.missingFeatures?.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <X size={18} className="text-gray-600 flex-shrink-0" />
                                        <span className="text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={()=>{buttonAction(plan.buttonText) }}
                                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.isPremium
                                    ? "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                    }`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;