import { motion } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../redux/questionSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import TestSubmission from "./testsubmit";

const TestFormUnAuthorized = () => {
    const { subjectId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        questionCount: 10,
        difficulty: "medium",
        questionType: "mixed",
        subjectId: subjectId,
        negative: false,
        timePerQuestion: 90
    });

    const modalOpen = useSelector((store) => store.unAuth.modalOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [testGenerated, setTestGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [questions, setQuestion] = useState([]);
    const [showScoreModal, setShowscoreModal] = useState(modalOpen);
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home", { replace: true });
        }
    }, [navigate, isLoggedIn]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        if (!formData.description || !formData.title) {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setIsGenerating(false);
            return;
        }
        setError(false);
        try {
            const response = await axios.post(`${process.env.REACT_APP_TEST_URL}/generate`, {
                formData,
            });
            if (response.data.success) {
                localStorage.removeItem("testData");
                localStorage.setItem(
                    "testData",
                    JSON.stringify({
                        config: {
                            title: formData.title,
                            description: formData.description,
                            questionCount: formData.questionCount,
                            difficulty: formData.difficulty,
                            questionType: formData.questionType,
                            subjectId: formData.subjectId,
                            negative: formData.negative,
                            timePerQuestion: formData.timePerQuestion
                        },
                        fullData: response.data.jsonResponse
                    })
                );
                setQuestion(response.data.jsonResponse.questions);
                toast.success("Test generated successfully!");
                setTestGenerated(true);
            }
        } catch (error) {
            console.error("Error generating test:", error);
            toast.error("Failed to generate test");
        } finally {
            setIsGenerating(false);
        }
    };

    const attemptNow = async () => {
        const sanitizedQuestions = questions.map(({ correctAnswer, ...q }) => ({
            ...q
        }));
        const testDetailsForRedux = {
            testId: null,
            name: formData.title,
            timePerquestion: formData.timePerQuestion,
            negativeMarks: formData.negative,
            numberOfQuestions: formData.questionCount
        };
        dispatch(setQuestions(sanitizedQuestions));
        dispatch(setIsTestOn(true));
        dispatch(setTestDetails(testDetailsForRedux));
        toast.success("Your test starts now!");
        dispatch(setTimeStartedAt(Date.now()));
        navigate("/guest/attemptTest", { replace: true });
    };

    return (
        <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center px-4 py-8 overflow-hidden">
            {/* Animated background gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            {showScoreModal && <TestSubmission />}

            {!testGenerated ? (
                <motion.div
                    className="w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6 relative z-10"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        x: shake ? [-10, 10, -10, 10, 0] : 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                >
                    {/* Header with gradient text */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white">
                            Create a <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Test</span>
                        </h1>
                        <p className="text-gray-400">Generate your custom Prashn Patra with AI-powered questions</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                Test Title
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition duration-300"
                                    placeholder="e.g., Physics Midterm Exam"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                Topic / Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition duration-300 resize-none"
                                placeholder="Describe the topics or concepts to be tested..."
                            />
                        </div>

                        {/* Question Count */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                Number of Questions
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    name="questionCount"
                                    value={formData.questionCount}
                                    onChange={handleChange}
                                    min="5"
                                    max="100"
                                    className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <span className="text-orange-400 font-semibold text-lg min-w-[3rem] text-right">
                                    {formData.questionCount}
                                </span>
                            </div>
                        </div>

                        {/* Settings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Difficulty */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                    Difficulty Level
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition duration-300 cursor-pointer"
                                >
                                    <option value="easy" className="bg-slate-900">Easy</option>
                                    <option value="medium" className="bg-slate-900">Medium</option>
                                    <option value="hard" className="bg-slate-900">Hard</option>
                                </select>
                            </div>

                            {/* Question Type */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                    Question Type
                                </label>
                                <select
                                    name="questionType"
                                    value={formData.questionType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition duration-300 cursor-pointer"
                                >
                                    <option value="mcq" className="bg-slate-900">Multiple Choice</option>
                                    <option value="mixed" className="bg-slate-900">Mixed</option>
                                    <option value="truefalse" className="bg-slate-900">True/False</option>
                                </select>
                            </div>
                        </div>

                        {/* Time & Negative Marking */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Time Per Question */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                    Time Per Question (sec)
                                </label>
                                <input
                                    type="number"
                                    name="timePerQuestion"
                                    value={formData.timePerQuestion}
                                    onChange={handleChange}
                                    min="30"
                                    max="300"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition duration-300"
                                />
                            </div>

                            {/* Negative Marking Toggle */}
                            <div className="space-y-2 flex flex-col justify-end">
                                <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                    Negative Marking
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="negative"
                                            checked={formData.negative}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600/80"></div>
                                    </label>
                                    <span className="text-gray-400 text-sm">{formData.negative ? "Enabled" : "Disabled"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
                            >
                                <p className="text-red-400 text-sm font-medium">
                                    ⚠️ Please provide both test title and topic description.
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isGenerating}
                            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-300 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <ClipLoader color="white" size={18} />
                                    <span>Generating Test...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Generate Test
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer text */}
                    <p className="text-center text-gray-500 text-xs">
                        AI-powered test generation • Customizable difficulty • Instant creation
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 relative z-10 space-y-6"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center"
                        >
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </motion.div>

                        {/* Success Message */}
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-white">
                                Test Generated! 🎉
                            </h2>
                            <p className="text-gray-400">
                                Your <span className="text-orange-400 font-semibold">{formData.title}</span> is ready with <span className="text-orange-400 font-semibold">{formData.questionCount}</span> questions
                            </p>
                        </div>

                        {/* Test Details Preview */}
                        <div className="w-full grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-wide">Difficulty</p>
                                <p className="text-white font-semibold capitalize">{formData.difficulty}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-wide">Type</p>
                                <p className="text-white font-semibold capitalize">{formData.questionType}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-wide">Per Question</p>
                                <p className="text-white font-semibold">{formData.timePerQuestion}s</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-wide">Total Time</p>
                                <p className="text-white font-semibold">{Math.round((formData.questionCount * formData.timePerQuestion) / 60)}m</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTestGenerated(false)}
                            className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition duration-300 font-semibold"
                        >
                            Create Another
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={attemptNow}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition duration-300 font-semibold shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            Attempt Now
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default TestFormUnAuthorized;
