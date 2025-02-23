import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TakePayment = () => {
    const [loading, setLoading] = useState(false);
    const {user}=useSelector((store)=>store.auth)
    const productFeatures = [
        "Unlimited AI-Generated Tests",
        "Multiple Subject Support",
        "Detailed Analysis",
        "Custom Difficulty Levels",
        "Instant Results & Analytics",
        "24/7 Customer Support"
    ];

    const priceDetails = {
        basePrice: 99,
        discount: 50,
        finalPrice: 1
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_PAYMENT_URL}/orders`,
                { amount: priceDetails.finalPrice, currency: "INR" },
                { withCredentials: true }
            );

            const options = {
                key: res.data.key_id,
                amount: res.data.amount,
                currency: res.data.currency,
                name: "Prashna Patra Pro",
                description: "Access to AI-powered Test Generator",
                order_id: res.data.order_id,
                handler: function (response) {
                    window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=${priceDetails.finalPrice}&success=true`;
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "9520303583",
                },
                theme: {
                    color: "#4F46E5"
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Product Header */}
                    <div className="bg-indigo-600 px-6 py-8 text-white">
                        <h1 className="text-3xl font-bold">Test Generator Pro</h1>
                        <p className="mt-2 text-indigo-100">Unlock the power of AI-driven test generation</p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Features List */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">What You'll Get</h2>
                            <ul className="space-y-3">
                                {productFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Details & Checkout */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Base Price</span>
                                    <span>₹{priceDetails.basePrice}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>- ₹{priceDetails.discount}</span>
                                </div>
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>₹{priceDetails.finalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className={`mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium
                                        ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                                >
                                    {loading ? 'Processing...' : 'Proceed to Pay →'}
                                </button>

                                <p className="mt-4 text-sm text-gray-500 text-center">
                                    Secure payment powered by Razorpay
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-600">
                    <div className="p-4 bg-white rounded-lg shadow">
                        <svg className="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-sm">Secure Payment</span>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <svg className="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Instant Access</span>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <svg className="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm">Money-back Guarantee</span>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <svg className="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm">24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakePayment;