import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br lg:px-80 md:px-24 px-3 pt-14 from-gray-900 to-gray-700 text-white">
            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center text-center px-6 py-20">
                <h2 className="text-5xl font-extrabold">Generate Tests Instantly with AI</h2>
                <p className="mt-4 text-lg text-gray-200 max-w-2xl">
                    Create quizzes, exams, and assessments effortlessly. Customize difficulty, topics, and formats
                    to match your needs.
                </p>
                <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100">
                    Get Started for Free
                </button>
            </header>

            {/* Features Section */}
            <section className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold">AI-Powered Test Generation</h3>
                    <p className="mt-2 text-gray-600">Instantly generate high-quality questions across multiple subjects.</p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold">Customizable Questions</h3>
                    <p className="mt-2 text-gray-600">Set difficulty levels, question types, and subjects for tailored tests.</p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold">Instant Performance Reports</h3>
                    <p className="mt-2 text-gray-600">Analyze scores, strengths, and weaknesses with AI insights.</p>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="px-6 py-16 text-center">
                <h2 className="text-4xl font-bold mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Step 1: Select Your Topic</h3>
                        <p className="mt-2 text-gray-300">Choose the subject and topics for your test.</p>
                    </div>
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Step 2: Customize Settings</h3>
                        <p className="mt-2 text-gray-300">Adjust difficulty, question types, and duration.</p>
                    </div>
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Step 3: Generate & Share</h3>
                        <p className="mt-2 text-gray-300">Instantly generate the test and share it with students.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="px-6 py-16 text-center bg-gray-900">
                <h2 className="text-4xl font-bold mb-6 text-orange-400">What Educators Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <p className="text-lg text-gray-300 italic">“This AI test generator has saved me hours of work. The questions are accurate and well-structured.”</p>
                        <h4 className="mt-4 font-semibold">- Prof. Anjali Sharma</h4>
                    </div>
                    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                        <p className="text-lg text-gray-300 italic">“A game-changer for online assessments. My students love the instant feedback and analytics.”</p>
                        <h4 className="mt-4 font-semibold">- Dr. Rajeev Kumar</h4>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 bg-gray-800 text-gray-400">
                <div className="max-w-4xl mx-auto">
                    {/* Policy Links */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link to="/terms-and-condition" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/refund-policy" className="hover:text-white transition-colors">
                            Refund Policy
                        </Link>
                        <Link to="/shipping-policy" className="hover:text-white transition-colors">
                            Shipping Policy
                        </Link>
                        <Link to="/contact-us" className="hover:text-white transition-colors">
                            Contact Us
                        </Link>
                    </div>
                    {/* Copyright */}
                    <p>&copy; {new Date().getFullYear()} Prashn Patra. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
