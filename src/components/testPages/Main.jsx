import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../../redux/questionSlice";
import { Menu, X, List, CheckSquare } from "lucide-react";
import axios from "axios";

const TestAttempt = () => {
    const [questions, setQuestionsArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const allQuestions = useSelector((store) => store.questions.questions);
    const testDetails = useSelector((store) => store.questions.testDetails);
    const timeStartedAt = useSelector((store) => store.questions.timeStartedAt);
    const dispatch = useDispatch();

    useEffect(() => {
        setQuestionsArray(allQuestions);
    }, [allQuestions]);

    const [remainingTime, setRemainingTime] = useState(testDetails.timePerquestion * testDetails.numberOfQuestions * 1000);

    useEffect(() => {
        if (timeStartedAt) {
            const updateRemainingTime = () => {
                const elapsedTime = Date.now() - timeStartedAt;
                const newRemainingTime = Math.max(testDetails.timePerquestion * testDetails.numberOfQuestions * 1000 - elapsedTime, 0);
                setRemainingTime(newRemainingTime);
            };

            updateRemainingTime();
            const interval = setInterval(updateRemainingTime, 1000);
            return () => clearInterval(interval);
        }
    }, [timeStartedAt]);

    const minutes = Math.floor(remainingTime / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const saveData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_TEST_URL}/submitTest`,
                { questions, testId: testDetails.testId },
                { withCredentials: true }
            );
            if (response.data.success) {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (minutes === 0 && seconds === 0) {
            saveData();
            dispatch(setIsTestOn(false));
            dispatch(setTestDetails(null));
            dispatch(setQuestions(null));
            dispatch(setTimeStartedAt(null));
            navigate("/home", { replace: true });
            alert("Successfully submitted your test!");
            return;
        }

        if (window.confirm("Do you want to submit your test early?")) {
            saveData();
            dispatch(setIsTestOn(false));
            dispatch(setTestDetails(null));
            dispatch(setQuestions(false));
            dispatch(setTimeStartedAt(null));
            navigate("/home", { replace: true });
        }
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
            index === currentQuestionIndex ? { ...q, attempted: false, chosenOption: null } : q
        );
        dispatch(setQuestions(updatedQuestions));
    };

    return (
        <div className="flex relative h-screen max-h-[calc(100vh-72px)] bg-gray-900 text-white">
            {/* Mobile navigation buttons */}
            <div className="fixed top-0 left-0 right-0  flex justify-between p-4 bg-gray-800 md:hidden">
                <button
                    onClick={() => setShowQuestionList(!showQuestionList)}
                    className="p-2 bg-gray-700 rounded-md"
                >
                    {showQuestionList ? <X size={24} /> : <List size={24} />}
                </button>
                <button
                    onClick={() => setShowStatus(!showStatus)}
                    className="p-2 bg-gray-700 rounded-md"
                >
                    {showStatus ? <X size={24} /> : <CheckSquare size={24} />}
                </button>
            </div>

            {/* Questions sidebar - hidden on mobile by default */}
            <div className={`fixed md:relative w-4/5 md:w-1/5 h-full bg-gray-800 transform transition-transform duration-300 ease-in-out z-40 
                ${showQuestionList ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-4 h-full overflow-y-auto">
                    <h2 className="text-lg font-bold py-4">Questions</h2>
                    <ul>
                        {questions.map((q, index) => (
                            <li
                                key={q.id}
                                className={`p-2 my-2 border border-gray-700 rounded-sm cursor-pointer flex items-center gap-2
                                ${index === currentQuestionIndex ? "bg-gray-700" : ""} 
                                ${q.attempted ? "text-green-400" : "text-red-400"}`}
                                onClick={() => {
                                    setCurrentQuestionIndex(index);
                                    setShowQuestionList(false);
                                }}
                            >
                                <span>{index + 1}.</span>
                                <span className="truncate w-full">{q.question}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4  ">
                <div className="flex flex-col h-full">
                    <div className="bg-gray-500 text-white p-3 md:p-5 rounded-md mb-4 flex justify-between items-center flex-wrap">
                        <h1 className="text-lg md:text-xl font-bold capitalize mb-2">Test: {testDetails?.name}</h1>
                        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                            <div className="p-2 rounded-md bg-slate-800">
                                Mark: <span className="text-green-500">1</span>
                            </div>
                            <div className="p-2 rounded-md bg-slate-800">
                                Negative: <span className="text-red-500">{testDetails.negativeMarks ? "-0.25" : "0"}</span>
                            </div>
                            <span className="text-orange-600 text-xl md:text-2xl">Time: {`${minutes}:${seconds}`}</span>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h2 className="text-lg mb-4">{questions[currentQuestionIndex]?.question}</h2>
                        <div className="space-y-3">
                            {questions[currentQuestionIndex]?.options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className={`${option === questions[currentQuestionIndex]?.userAnswer ? "bg-gray-500" : ""} 
                                        p-3 border border-gray-700 rounded cursor-pointer hover:bg-gray-700`}
                                    onClick={() => handleOptionSelect(option, currentQuestionIndex)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between gap-2">
                        <button
                            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                            onClick={() => handleNavigation("prev")}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded" onClick={handleClear}>
                            Clear
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                            onClick={() => handleNavigation("next")}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
 
            <div className={`fixed md:relative right-0 max-w-96  md:w-80   h-screen max-h-[calc(100vh-78px)] bg-gray-800 transform transition-transform duration-300 ease-in-out z-40
                ${showStatus ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
                <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-4">Question Status</h2>
                        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className={`p-2 text-center rounded ${q.attempted ? "bg-green-500" : "bg-red-500"}`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded"
                        onClick={handleSubmit}
                    >
                        Submit Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestAttempt;