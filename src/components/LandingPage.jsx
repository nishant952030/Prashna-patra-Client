import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Code2, Sparkles, Menu, X as CloseIcon, BookOpen, Lightbulb } from "lucide-react";

const LandingPage = () => {
    const [showPricing, setShowPricing] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: BookOpen,
            title: "100% Customizable",
            description: "Create tests exactly the way you want - from difficulty levels to question types, you're in complete control",
        },
        {
            icon: Zap,
            title: "AI-Powered Generation",
            description: "Generate unlimited test variations instantly. Perfect for practice, assignments, and exams",
        },
        {
            icon: BarChart3,
            title: "Smart Analytics",
            description: "Track your progress, identify weak areas, and get personalized insights to improve",
        },
        {
            icon: Code2,
            title: "Multi-Subject Support",
            description: "Works with any subject - Mathematics, Science, Programming, Languages, and more",
        },
        {
            icon: BookOpen,
            title: "Study Resources",
            description: "Access curated study materials, explanations, and hints for better learning",
        },
        {
            icon: Lightbulb,
            title: "Smart Suggestions",
            description: "AI suggests question types and topics based on your learning goals",
        },
    ];

    const useCases = [
        {
            title: "Self-Practice",
            description: "Generate unlimited practice tests on any topic to prepare for exams",
            icon: "📚",
        },
        {
            title: "Exam Preparation",
            description: "Create mock tests with custom difficulty and time limits",
            icon: "🎯",
        },
        {
            title: "Study Groups",
            description: "Share custom tests with classmates and collaborate",
            icon: "👥",
        },
        {
            title: "Assignment Help",
            description: "Create unique test papers for assignments and projects",
            icon: "✏️",
        },
    ];

    const testimonials = [
        {
            name: "Ananya Verma",
            role: "Engineering Student",
            text: "Finally, I can create custom tests for any topic! No more searching for practice questions. The customization options are incredible.",
            avatar: "AV",
        },
        {
            name: "Rohan Patel",
            role: "Medical Student",
            text: "The AI understands exactly what I need to study. Generates tests in minutes that would take hours to create manually.",
            avatar: "RP",
        },
        {
            name: "Priya Singh",
            role: "Class 12 Student",
            description: "My test scores improved by 30% after using Prashn Patra. The analytics show exactly where I need to focus.",
            avatar: "PS",
        },
    ];

    const customizationOptions = [
        { label: "Difficulty Level", icon: "⚙️" },
        { label: "Number of Questions", icon: "📊" },
        { label: "Question Types", icon: "📝" },
        { label: "Topics & Subtopics", icon: "🎓" },
        { label: "Time Limits", icon: "⏱️" },
        { label: "Languages", icon: "🌐" },
    ];

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
        <div className="bg-gradient-to-b from-slate-950 via-[#0f1419] to-slate-950 text-white overflow-hidden"> 
            {/* Hero Section */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen flex items-center justify-center px-4 pt-20"
            >
                <div className="max-w-5xl mx-auto text-center relative">
                    {/* Background decorative elements */}
                    <div className="absolute top-20 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-30" />

                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/50">
                            <Sparkles size={16} className="text-orange-400" />
                            <span className="text-sm text-orange-300">Trusted by 50,000+ students worldwide</span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
                    >
                        Create Any Test You Want
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Generate unlimited, customizable tests in seconds. Practice smarter, study better, ace your exams.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowPricing(true)}
                            className="px-8 py-4 rounded-lg bg-orange-600 hover:bg-orange-700 font-semibold text-lg flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all"
                        >
                            Start Generating Tests <ArrowRight size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-lg border border-orange-500/50 hover:border-orange-500 font-semibold text-lg transition-all text-orange-400"
                        >
                            See Demo
                        </motion.button>
                    </motion.div>

                    {/* Hero Image/Visual */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 relative"
                    >
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent rounded-2xl border border-orange-500/30 p-8 backdrop-blur-sm">
                            <div className="bg-[#0a0e14]/80 rounded-lg p-8 font-mono text-sm text-gray-300 border border-orange-500/20">
                                <div className="space-y-3">
                                    <div className="text-orange-400">📋 Custom Test Parameters</div>
                                    <div className="text-gray-400 ml-4">
                                        <div>✓ Topic: Physics - Mechanics</div>
                                        <div>✓ Difficulty: Hard</div>
                                        <div>✓ Questions: 50</div>
                                        <div>✓ Time Limit: 2 hours</div>
                                        <div>✓ Question Types: MCQ, Short Answer, Numerical</div>
                                    </div>
                                    <div className="text-green-400 mt-4">✨ Test Generated in 3 seconds!</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Customization Options */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-4"
                    >
                        Complete Control Over Your Tests
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto"
                    >
                        Customize every aspect of your tests - from content to format
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {customizationOptions.map((option, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 rounded-lg bg-[#0f1419]/60 border border-orange-500/30 hover:border-orange-500/60 transition-all text-center"
                            >
                                <div className="text-4xl mb-3">{option.icon}</div>
                                <h3 className="font-bold text-white">{option.label}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Key Features Section */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-4"
                    >
                        Powerful Features for Better Learning
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto"
                    >
                        Everything you need to study effectively and excel in your exams
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-8 rounded-xl bg-[#0f1419]/60 border border-orange-500/30 hover:border-orange-500/60 transition-all hover:shadow-lg hover:shadow-orange-500/20"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                                        <Icon size={24} className="text-orange-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* Use Cases */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        Use Cases for Every Student
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {useCases.map((useCase, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 rounded-lg bg-[#0f1419]/60 border border-orange-500/30 hover:border-orange-500/60 transition-all text-center"
                            >
                                <div className="text-4xl mb-3">{useCase.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                                <p className="text-gray-400 text-sm">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        What Students Say
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 rounded-lg bg-[#0f1419]/60 border border-orange-500/30 hover:border-orange-500/60 transition-all"
                            >
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center font-bold flex-shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic text-sm">"{testimonial.text}"</p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-orange-400">★</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* How It Works */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        Get Started in 3 Steps
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { step: "1", title: "Customize Your Test", desc: "Select subject, difficulty, questions type, and more" },
                            { step: "2", title: "Generate Instantly", desc: "AI creates your test in seconds with high-quality questions" },
                            { step: "3", title: "Study & Improve", desc: "Take the test, track progress, and identify areas to improve" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-orange-500/30">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Pricing Preview */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Affordable Plans for Every Student
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-400 mb-8 text-lg"
                    >
                        Start free. Upgrade whenever you're ready.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPricing(true)}
                        className="px-8 py-4 rounded-lg bg-orange-600 hover:bg-orange-700 font-semibold text-lg inline-flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all"
                    >
                        View Pricing <ArrowRight size={20} />
                    </motion.button>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section className="py-20 px-4 relative">
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-orange-600/20 to-orange-500/10 rounded-2xl border border-orange-500/30 p-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Ready to Study Smarter?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-300 mb-8 text-lg"
                    >
                        Join 50,000+ students who are achieving better results with Prashn Patra.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPricing(true)}
                        className="px-8 py-4 rounded-lg bg-orange-600 hover:bg-orange-700 font-semibold text-lg flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all mx-auto"
                    >
                        Start Free Today <ArrowRight size={20} />
                    </motion.button>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="border-t border-orange-500/20 py-12 px-4">
                <div className="max-w-6xl mx-auto text-center text-gray-500">
                    <p>&copy; 2024 Prashn Patra. All rights reserved. | For students, by students.</p>
                </div>
            </footer>

            {/* Pricing Modal Trigger */}
            {showPricing && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowPricing(false)}
                />
            )}
        </div>
    );
};

export default LandingPage;