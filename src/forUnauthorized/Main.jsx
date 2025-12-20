import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../redux/questionSlice.js";
import { X, List, CheckSquare, ChevronLeft, ChevronRight, RotateCcw, Send } from "lucide-react";
import axios from "axios";
import TestSubmission from "./testsubmit.jsx";
import { setModalOpen } from "../redux/unauth.js";

const TestAttemptGuest = () => {
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
        setQuestionsArray(allQuestions);
    }, [allQuestions]);

    const [remainingTime, setRemainingTime] = useState(testDetails?.timePerquestion * testDetails?.numberOfQuestions * 1000);
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        if (timeStartedAt) {
            const updateRemainingTime = () => {
                const elapsedTime = Date.now() - timeStartedAt;
                const newRemainingTime = Math.max(testDetails?.timePerquestion * testDetails?.numberOfQuestions * 1000 - elapsedTime, 0);
                setRemainingTime(newRemainingTime);

                if (newRemainingTime < 300000 && newRemainingTime > 0) {
                    setTimeWarning(true);
                }
            };

            updateRemainingTime();
            const interval = setInterval(updateRemainingTime, 1000);
            return () => clearInterval(interval);
        }
    }, [timeStartedAt]);

    const minutes = Math.floor(remainingTime / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
    const percentComplete = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
    const attemptedCount = questions.filter(q => q.attempted).length;

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (minutes === 0 && seconds === 0) {
            saveTestAttemptData();
            clearTestState();
            alert("Successfully submitted your test!");
            navigate("/", { replace: true });
            return;
        }
        if (window.confirm("Do you want to submit your test early?")) {
            saveTestAttemptData();
            clearTestState();
            navigate("/", { replace: true });
        }
    };

    const saveTestAttemptData = () => {
        const testAttempt = {
            chosenAnswerQuestions: questions,
            correctAnswersQuestions: JSON.parse(localStorage.getItem("testData"))?.fullData?.questions || [],
            timestamp: Date.now()
        };
        localStorage.setItem("pendingTestAttempt", JSON.stringify(testAttempt));
    };

    const clearTestState = () => {
        dispatch(setIsTestOn(false));
        dispatch(setTestDetails(null));
        dispatch(setQuestions(null));
        dispatch(setTimeStartedAt(null));
        dispatch(setModalOpen(true));
    };

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            handleSubmit();
        }
    }, [minutes, seconds]);

    const handleOptionSelect = (option, currentQuestionIndex) => {
        const updatedQuestionsArray = questions.map((q, index) =>
            index === currentQuestionIndex ? { ...q, userAnswer: option, attempted: true } : q
        );
        dispatch(setQuestions(updatedQuestionsArray));
        setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option });
    };

    const handleNavigation = (direction) => {
        if (direction === "next" && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (direction === "prev" && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleClear = () => {
        const updatedSelections = { ...selectedOptions };
        delete updatedSelections[currentQuestionIndex];
        setSelectedOptions(updatedSelections);

        const updatedQuestions = questions.map((q, index) =>
            index === currentQuestionIndex ? { ...q, attempted: false, userAnswer: null } : q
        );
        dispatch(setQuestions(updatedQuestions));
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full h-full flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Mobile Toggle Buttons */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-2">
                <button
                    onClick={() => setShowQuestionList(!showQuestionList)}
                    className="flex-1 p-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition"
                >
                    {showQuestionList ? <X size={18} /> : <List size={18} />}
                </button>
                <button
                    onClick={() => setShowStatus(!showStatus)}
                    className="flex-1 p-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition"
                >
                    {showStatus ? <X size={18} /> : <CheckSquare size={18} />}
                </button>
            </div>

            {/* Left Sidebar - Questions List (Hidden on Mobile) */}
            <div className="hidden md:flex md:w-72 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-r border-white/10 flex-col">
                {/* Sidebar Header */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                        <List size={18} className="text-orange-500" />
                        Questions
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">{attemptedCount}/{questions.length} attempted</p>
                </div>

                {/* Questions List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 p-2">
                    <ul className="space-y-1">
                        {questions.map((q, index) => (
                            <li key={q.id || index}>
                                <button
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`w-full text-left p-2 rounded text-xs transition border-l-4 ${index === currentQuestionIndex
                                        ? "bg-orange-500/20 border-orange-500 text-white"
                                        : "bg-white/5 border-transparent hover:bg-white/10"
                                        } ${q.attempted ? "text-green-300" : "text-gray-400"}`}
                                >
                                    <span className="font-semibold">{index + 1}.</span> {q.question.substring(0, 35)}...
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className={`backdrop-blur-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-white/10 p-3 flex-shrink-0 transition ${timeWarning ? "from-red-900/40" : ""}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div className="flex-1">
                            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent truncate">
                                {testDetails?.name}
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">Q {currentQuestionIndex + 1}/{questions.length}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                            <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                                Mark: <span className="text-green-400 font-semibold">1</span>
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                                Negative: <span className={testDetails?.negativeMarks ? "text-red-400" : "text-gray-400"}>{testDetails?.negativeMarks ? "-0.25" : "0"}</span>
                            </div>
                            <div className={`px-3 py-1 rounded-lg border-2 font-bold transition ${timeWarning ? "bg-red-500/20 border-red-500/50 text-red-300 animate-pulse" : "bg-white/5 border-white/10 text-orange-400"}`}>
                                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 hidden md:block">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-orange-400">{Math.round(percentComplete)}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500" style={{ width: `${percentComplete}%` }} />
                        </div>
                    </div>
                </div>

                {/* Question Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 scrollbar-thin scrollbar-thumb-white/20">
                    <div className="max-w-2xl mx-auto space-y-4">
                        {/* Question */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-xs font-bold text-orange-500 flex-shrink-0 pt-1">Q{currentQuestionIndex + 1}</span>
                                <h2 className="text-base md:text-lg font-semibold leading-relaxed">{currentQuestion?.question}</h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-2 mt-4">
                                {currentQuestion?.options?.map((option, idx) => {
                                    const isSelected = currentQuestion?.userAnswer === option;
                                    const optionLabel = String.fromCharCode(65 + idx);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option, currentQuestionIndex)}
                                            className={`w-full p-3 rounded-lg border-2 text-left transition text-sm ${isSelected
                                                ? "bg-orange-500/20 border-orange-500 text-white"
                                                : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-200"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold border-2 flex-shrink-0 text-xs ${isSelected
                                                    ? "bg-orange-500 border-orange-600 text-white"
                                                    : "border-white/30 text-gray-400"
                                                    }`}>
                                                    {optionLabel}
                                                </div>
                                                <span>{option}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="backdrop-blur-xl bg-gradient-to-t from-slate-900/95 to-slate-800/95 border-t border-white/10 p-3 flex-shrink-0">
                    <div className="flex justify-between items-center gap-2">
                        <button
                            className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 disabled:opacity-40 transition text-xs md:text-sm"
                            onClick={() => handleNavigation("prev")}
                            disabled={currentQuestionIndex === 0}
                        >
                            <ChevronLeft size={16} />
                            <span className="hidden md:inline">Prev</span>
                        </button>

                        <button
                            className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-xs md:text-sm"
                            onClick={handleClear}
                        >
                            <RotateCcw size={16} />
                            <span className="hidden md:inline">Clear</span>
                        </button>

                        <button
                            className="flex items-center gap-1 px-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 disabled:opacity-40 transition text-xs md:text-sm"
                            onClick={() => handleNavigation("next")}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            <span className="hidden md:inline">Next</span>
                            <ChevronRight size={16} />
                        </button>

                        <button
                            className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg border border-orange-400/30 transition text-xs md:text-sm font-semibold ml-auto"
                            onClick={handleSubmit}
                        >
                            <Send size={16} />
                            <span className="hidden md:inline">Submit</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Status (Hidden on Mobile) */}
            <div className="hidden md:flex md:w-64 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-l border-white/10 flex-col">
                {/* Status Header */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                        <CheckSquare size={18} className="text-orange-500" />
                        Status
                    </h2>
                </div>

                {/* Stats */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <div className="space-y-2 text-xs">
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
                    </div>
                </div>

                {/* Question Grid */}
                <div className="flex-1 overflow-y-auto p-3">
                    <h3 className="text-xs font-semibold text-gray-300 mb-2">All Questions</h3>
                    <div className="grid grid-cols-5 gap-1">
                        {questions.map((q, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`p-1.5 text-xs font-bold rounded border-2 transition ${index === currentQuestionIndex
                                    ? "bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/50"
                                    : q.attempted
                                        ? "bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30"
                                        : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/20"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="m-3 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg border border-orange-400/30 flex items-center justify-center gap-2 transition text-sm flex-shrink-0"
                    onClick={handleSubmit}
                >
                    <Send size={16} />
                    Submit Test
                </button>
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
                    <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-l border-white/10 flex flex-col overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3 border-b border-white/10">
                            <h2 className="text-sm font-bold">Status</h2>
                        </div>
                        <div className="p-3 space-y-3">
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
                                        className={`p-1.5 text-xs font-bold rounded border-2 ${index === currentQuestionIndex
                                            ? "bg-orange-500 border-orange-600 text-white"
                                            : q.attempted
                                                ? "bg-green-500/20 border-green-500/50 text-green-300"
                                                : "bg-white/10 border-white/20 text-gray-300"
                                            }`}
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

export default TestAttemptGuest;
