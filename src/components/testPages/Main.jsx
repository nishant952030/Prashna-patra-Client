import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../../redux/questionSlice";
import { X, List, CheckSquare, ChevronLeft, ChevronRight, RotateCcw, Send, Eye } from "lucide-react";
import axios from "axios";
import { setFeedbackForm } from "../../redux/feedback";
import { motion } from "framer-motion";

const TestAttempt = () => {
    const [questions, setQuestionsArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [timeWarning, setTimeWarning] = useState(false);

    const allQuestions = useSelector((store) => store.questions.questions);
    const testDetails = useSelector((store) => store.questions.testDetails);
    const timeStartedAt = useSelector((store) => store.questions.timeStartedAt);
    const dispatch = useDispatch();

    useEffect(() => {
        setQuestionsArray(allQuestions || []);
    }, [allQuestions]);

    const [remainingTime, setRemainingTime] = useState(
        (testDetails?.timePerquestion || 0) * (testDetails?.numberOfQuestions || 0) * 1000
    );

    const location = useLocation();
    const currentPath = location.pathname;

    const isSolutionsView = currentPath === "/solutions" ||
        (questions.length > 0 && questions[0]?.correctAnswer !== undefined && !timeStartedAt);

    useEffect(() => {
        if (timeStartedAt && testDetails?.timePerquestion && testDetails?.numberOfQuestions) {
            const updateRemainingTime = () => {
                const elapsedTime = Date.now() - timeStartedAt;
                const total = testDetails.timePerquestion * testDetails.numberOfQuestions * 1000;
                const newRemainingTime = Math.max(total - elapsedTime, 0);
                setRemainingTime(newRemainingTime);
                if (newRemainingTime < 300000 && newRemainingTime > 0) setTimeWarning(true);
            };

            updateRemainingTime();
            const interval = setInterval(updateRemainingTime, 1000);
            return () => clearInterval(interval);
        }
    }, [timeStartedAt, testDetails]);

    const minutes = Math.floor(remainingTime / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const navigate = useNavigate();

    const saveData = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_TEST_URL}/submitTest`,
                { questions, testId: testDetails?.testId },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const clearReduxState = () => {
        dispatch(setIsTestOn(false));
        dispatch(setTestDetails(null));
        dispatch(setQuestions(null));
        dispatch(setTimeStartedAt(null));
        dispatch(setFeedbackForm(true));
    };

    const handleSubmit = async () => {
        if (minutes === 0 && seconds === 0) {
            await saveData();
            clearReduxState();
            navigate("/home", { replace: true });
            alert("Successfully submitted your test!");
            return;
        }

        if (window.confirm("Do you want to submit your test early?")) {
            await saveData();
            clearReduxState();
            navigate("/home", { replace: true });
        }
    };

    useEffect(() => {
        if (minutes === 0 && seconds === 0 && !isSolutionsView) {
            handleSubmit();
        }
    }, [minutes, seconds]);

    const handleOptionSelect = (option, idx) => {
        if (isSolutionsView) return;

        const updatedQuestionsArray = questions.map((q, index) =>
            index === idx ? { ...q, userAnswer: option, attempted: true } : q
        );
        setQuestionsArray(updatedQuestionsArray);
        dispatch(setQuestions(updatedQuestionsArray));
        setSelectedOptions({ ...selectedOptions, [idx]: option });
    };

    const handleNavigation = (direction) => {
        if (direction === "next" && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else if (direction === "prev" && currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleClear = () => {
        if (isSolutionsView) return;
        const updatedSelections = { ...selectedOptions };
        delete updatedSelections[currentQuestionIndex];
        setSelectedOptions(updatedSelections);

        const updatedQuestions = questions.map((q, index) =>
            index === currentQuestionIndex ? { ...q, attempted: false, userAnswer: null } : q
        );
        setQuestionsArray(updatedQuestions);
        dispatch(setQuestions(updatedQuestions));
    };

    const currentQuestion = questions[currentQuestionIndex];

    const getOptionClasses = (option) => {
        if (isSolutionsView) {
            if (option === currentQuestion?.correctAnswer) {
                return "bg-green-500/20 border-green-500 text-green-200";
            }
            if (option === currentQuestion?.userAnswer && option !== currentQuestion?.correctAnswer) {
                return "bg-red-500/20 border-red-500 text-red-200";
            }
            return "bg-white/5 border-white/10 hover:bg-white/10";
        } else {
            if (option === currentQuestion?.userAnswer) {
                return "bg-orange-500/20 border-orange-500 text-orange-200";
            }
        }
        return "bg-white/5 border-white/10 hover:bg-white/10";
    };

    const attemptedCount = questions.filter((q) => q.attempted).length;

    return (
        <div className="w-full h-full flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Left Sidebar - Questions List (Hidden on Mobile) */}
            <div className={`hidden md:flex md:w-72 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-r border-white/10 flex-col`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            {isSolutionsView && <Eye size={16} className="text-orange-500" />}
                            <h2 className="text-sm font-bold">{isSolutionsView ? "Solutions" : "Questions"}</h2>
                        </div>
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded whitespace-nowrap">
                            {attemptedCount}/{questions.length}
                        </span>
                    </div>
                </div>

                {/* Questions List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                    <ul className="p-2 space-y-1">
                        {questions.map((q, index) => (
                            <li key={q.id || index}>
                                <button
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`w-full text-left p-2 rounded text-xs transition border-l-4 ${index === currentQuestionIndex
                                        ? "bg-orange-500/20 border-orange-500 text-white"
                                        : "bg-white/5 border-transparent hover:bg-white/10"
                                        } ${isSolutionsView
                                            ? q.userAnswer === q.correctAnswer ? "text-green-300" : "text-red-300"
                                            : q.attempted ? "text-green-300" : "text-gray-400"
                                        }`}
                                >
                                    <span className="font-semibold">{index + 1}.</span> {q.question.substring(0, 30)}...
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className={`backdrop-blur-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-white/10 p-3 flex-shrink-0 ${timeWarning && !isSolutionsView ? "from-red-900/40" : ""}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div className="flex-1">
                            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent truncate">
                                {isSolutionsView ? "📋 Solutions" : "🧪 Test"}: {testDetails?.name}
                            </h1>
                            <p className="text-xs text-gray-400">Q {currentQuestionIndex + 1}/{questions.length}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                            <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-green-400 font-semibold">1</span>
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                                <span className={testDetails?.negativeMarks ? "text-red-400" : "text-gray-400"}>
                                    {testDetails?.negativeMarks ? "-0.25" : "0"}
                                </span>
                            </div>
                            {!isSolutionsView && (
                                <div className={`px-3 py-1 rounded-lg border-2 font-bold transition ${timeWarning ? "bg-red-500/20 border-red-500/50 text-red-300 animate-pulse" : "bg-white/5 border-white/10 text-orange-400"}`}>
                                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 pb-32 md:pb-4">
                    <div className="max-w-2xl mx-auto space-y-4">
                        {/* Question */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-xs font-bold text-orange-500 flex-shrink-0 pt-1">Q{currentQuestionIndex + 1}</span>
                                <h2 className="text-base md:text-lg font-semibold leading-relaxed">{currentQuestion?.question}</h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                {currentQuestion?.options?.map((option, idx) => {
                                    const label = String.fromCharCode(65 + idx);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option, currentQuestionIndex)}
                                            className={`w-full p-3 rounded-lg border-2 text-left transition text-sm ${getOptionClasses(option)} ${isSolutionsView ? "cursor-default" : "cursor-pointer hover:scale-[1.01]"}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold border-2 flex-shrink-0 text-xs ${isSolutionsView ? option === currentQuestion?.correctAnswer ? "bg-green-500 border-green-600 text-white" : option === currentQuestion?.userAnswer ? "bg-red-500 border-red-600 text-white" : "border-white/30 text-gray-300" : option === currentQuestion?.userAnswer ? "bg-orange-500 border-orange-600 text-white" : "border-white/30 text-gray-300"}`}>
                                                    {label}
                                                </div>
                                                <div className="flex-1">
                                                    <span>{option}</span>
                                                    {isSolutionsView && (
                                                        <>
                                                            {option === currentQuestion?.correctAnswer && <span className="ml-2 text-xs text-green-400 font-semibold">✓</span>}
                                                            {option === currentQuestion?.userAnswer && option !== currentQuestion?.correctAnswer && <span className="ml-2 text-xs text-red-400 font-semibold">✗</span>}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Explanation */}
                        {isSolutionsView && currentQuestion?.explanation && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                                <h3 className="text-xs font-semibold text-blue-300 mb-2">📝 Explanation</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">{currentQuestion.explanation}</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="backdrop-blur-xl bg-gradient-to-t from-slate-900/95 to-slate-800/95 border-t border-white/10 p-3 flex-shrink-0">
                    {/* Mobile Toggle Buttons - INSIDE FOOTER ON MOBILE */}
                    <div className="md:hidden flex gap-2 mb-3">
                        <button
                            onClick={() => setShowQuestionList(!showQuestionList)}
                            className="flex-1 flex items-center justify-center gap-1 p-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition text-xs"
                        >
                            {showQuestionList ? <X size={16} /> : <List size={16} />}
                            <span className="hidden sm:inline">Questions</span>
                        </button>
                        <button
                            onClick={() => setShowStatus(!showStatus)}
                            className="flex-1 flex items-center justify-center gap-1 p-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition text-xs"
                        >
                            {showStatus ? <X size={16} /> : <CheckSquare size={16} />}
                            <span className="hidden sm:inline">Status</span>
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center gap-2">
                        <button
                            className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 disabled:opacity-40 transition text-xs md:text-sm"
                            onClick={() => handleNavigation("prev")}
                            disabled={currentQuestionIndex === 0}
                        >
                            <ChevronLeft size={16} />
                            <span className="hidden md:inline">Prev</span>
                        </button>

                        {!isSolutionsView && (
                            <button
                                className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-xs md:text-sm"
                                onClick={handleClear}
                            >
                                <RotateCcw size={16} />
                                <span className="hidden md:inline">Clear</span>
                            </button>
                        )}

                        <button
                            className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 disabled:opacity-40 transition text-xs md:text-sm"
                            onClick={() => handleNavigation("next")}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            <span className="hidden md:inline">Next</span>
                            <ChevronRight size={16} />
                        </button>

                        {/* Submit Button on Desktop */}
                        {!isSolutionsView && (
                            <button
                                className="hidden md:flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg border border-orange-400/30 transition text-sm"
                                onClick={handleSubmit}
                            >
                                <Send size={16} />
                                Submit
                            </button>
                        )}
                    </div>

                    {/* Submit Button on Mobile - FULL WIDTH */}
                    {!isSolutionsView && (
                        <button
                            className="md:hidden w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg border border-orange-400/30 transition text-sm"
                            onClick={handleSubmit}
                        >
                            <Send size={16} />
                            Submit Test
                        </button>
                    )}
                </div>
            </div>

            {/* Right Sidebar - Status (Hidden on Mobile) */}
            <div className={`hidden md:flex md:w-64 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-l border-white/10 flex-col`}>
                {/* Status Header */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                        <CheckSquare size={16} className="text-orange-500" />
                        {isSolutionsView ? "Results" : "Status"}
                    </h2>
                </div>

                {/* Stats */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <div className="space-y-2 text-xs">
                        {isSolutionsView ? (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Correct</span>
                                    <span className="font-bold text-green-400">{questions.filter(q => q.userAnswer === q.correctAnswer).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Incorrect</span>
                                    <span className="font-bold text-red-400">{questions.filter(q => q.userAnswer && q.userAnswer !== q.correctAnswer).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Not Attempted</span>
                                    <span className="font-bold text-gray-400">{questions.filter(q => !q.userAnswer).length}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Attempted</span>
                                    <span className="font-bold text-green-400">{attemptedCount}/{questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Unattempted</span>
                                    <span className="font-bold text-red-400">{questions.length - attemptedCount}/{questions.length}</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: `${questions.length ? (attemptedCount / questions.length) * 100 : 0}%` }} />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Question Grid */}
                <div className="flex-1 overflow-y-auto p-3">
                    <div className="grid grid-cols-5 gap-1">
                        {questions.map((q, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`p-1.5 text-xs font-bold rounded border-2 transition ${index === currentQuestionIndex ? "bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/50" : isSolutionsView ? q.userAnswer === q.correctAnswer ? "bg-green-500/20 border-green-500/50 text-green-300" : "bg-red-500/20 border-red-500/50 text-red-300" : q.attempted ? "bg-green-500/20 border-green-500/50 text-green-300" : "bg-white/10 border-white/20 text-gray-300"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Overlays */}
            {showQuestionList && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setShowQuestionList(false)}>
                    <div className="absolute left-0 top-0 w-72 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-r border-white/10 flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3 border-b border-white/10">
                            <h2 className="text-sm font-bold">Questions</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {questions.map((q, index) => (
                                <button
                                    key={q.id || index}
                                    onClick={() => {
                                        setCurrentQuestionIndex(index);
                                        setShowQuestionList(false);
                                    }}
                                    className={`w-full text-left p-2 rounded text-xs transition border-l-4 ${index === currentQuestionIndex
                                        ? "bg-orange-500/20 border-orange-500 text-white"
                                        : "bg-white/5 border-transparent hover:bg-white/10"
                                        }`}
                                >
                                    {index + 1}. {q.question.substring(0, 30)}...
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showStatus && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setShowStatus(false)}>
                    <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-l border-white/10 overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3 border-b border-white/10">
                            <h2 className="text-sm font-bold">Status</h2>
                        </div>
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Attempted</span>
                                    <span className="font-bold text-green-400">{attemptedCount}/{questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Unattempted</span>
                                    <span className="font-bold text-red-400">{questions.length - attemptedCount}/{questions.length}</span>
                                </div>
                            </div>
                            <h3 className="text-xs font-semibold text-gray-300 mt-4">All Questions</h3>
                            <div className="grid grid-cols-5 gap-1">
                                {questions.map((q, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            setShowStatus(false);
                                        }}
                                        className={`p-1.5 text-xs font-bold rounded border-2 ${index === currentQuestionIndex ? "bg-orange-500 border-orange-600 text-white" : q.attempted ? "bg-green-500/20 border-green-500/50 text-green-300" : "bg-white/10 border-white/20 text-gray-300"}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestAttempt;
