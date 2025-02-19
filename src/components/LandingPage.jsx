import React from "react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br lg:px-80 md:px-24 px-3 pt-14 from-gray-900 to-gray-700 text-white">
            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center text-center px-6 py-20">
                <h2 className="text-4xl font-extrabold">Generate Tests Instantly</h2>
                <p className="mt-4 text-lg text-gray-200">Create quizzes, exams, and assessments with AI-powered ease.</p>
                <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100">
                    Get Started
                </button>
            </header>

            {/* Features Section */}
            <section className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">AI-Powered</h3>
                    <p className="mt-2 text-gray-600">Generate questions instantly with AI.</p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Customizable</h3>
                    <p className="mt-2 text-gray-600">Set difficulty levels and formats.</p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Instant Reports</h3>
                    <p className="mt-2 text-gray-600">Analyze performance with ease.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
