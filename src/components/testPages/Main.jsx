import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../../redux/questionSlice";
import axios from "axios";

const TestAttempt = () => {
    const [questions, setQuestionsArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
  
    const allQuestions = useSelector((store) => store.questions.questions);
    const testDetails = useSelector((store) => store.questions.testDetails);
    const timeStartedAt = useSelector((store) => store.questions.timeStartedAt);
    const dispatch = useDispatch();
 
 
    useEffect(() => {
        setQuestionsArray(allQuestions);
    }, [allQuestions]);
    const [remainingTime, setRemainingTime] = useState(testDetails.timePerquestion*testDetails.numberOfQuestions * 1000);

    useEffect(() => {
        if (timeStartedAt) {
            const updateRemainingTime = () => {
                const elapsedTime = Date.now() - timeStartedAt;
                const newRemainingTime = Math.max(testDetails.timePerquestion * testDetails.numberOfQuestions * 1000 - elapsedTime, 0);
                setRemainingTime(newRemainingTime);
            };

            updateRemainingTime(); // Update immediately
            const interval = setInterval(updateRemainingTime, 1000); // Update every second

            return () => clearInterval(interval);
        }
    }, [timeStartedAt]);

    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(remainingTime / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const saveData = async() => {
        const userResponse = questions;
        try {
            const response = await axios.post(`${process.env.TEST_URL}/submitTest`, { questions: userResponse, testId: testDetails.testId }, { withCredentials: true });
            if (response.data.success)
            { console.log(response.data.message)}
        } catch (error) {
            console.log(error)
        }
  
    } 
   
    const navigate = useNavigate();
    const handleSubmit = async () => {  
        if (minutes === 0 && seconds === 0) {
            saveData();
            dispatch(setIsTestOn(false));
            dispatch(setTestDetails(null))
            dispatch(setQuestions(null))
            dispatch(setTimeStartedAt(null))
            navigate("/home", { replace: true });
            alert("Successfully submitted your test!");
            return;
        }
        
        if (window.confirm("Do you want to submit your test early?")) {
            saveData();
            dispatch(setIsTestOn(false));
            dispatch(setTestDetails(null))
            dispatch(setQuestions(false))
            dispatch(setTimeStartedAt(null))
            navigate("/home", { replace: true });
        }
        return;
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

        // Use map to create a new array
        const updatedQuestions = questions.map((q, index) =>
            index === currentQuestionIndex ? { ...q, attempted: false, chosenOption: null } : q
        );

        dispatch(setQuestions(updatedQuestions));
    };


    return (
        <div className="flex h-screen max-h-[calc(100vh-72px)] bg-gray-900 text-white">
            {/* Sidebar with questions */}
            <div className="w-1/5 p-4 bg-gray-800  overflow-y-scroll">
                <h2 className="text-lg font-bold py-4">Questions</h2>
                <ul >
                    {questions.map((q, index) => (
                        <li
                            key={q.id}
                            className={`p-2 my-2 border border-gray-700 rounded-sm cursor-pointer flex items-center gap-2
                    ${index === currentQuestionIndex ? "bg-gray-700" : ""} 
                    ${q.attempted ? "text-green-400" : "text-red-400"}`}
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            <span>{index + 1}.</span>
                            <span className="truncate w-full overflow-hidden whitespace-nowrap">
                                {q.question}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Main question section */}
            <div className="flex flex-1 flex-col p-6 justify-between">
                <div>

                    <div className="flex justify-between mb-4 bg-gray-500 text-white p-5 rounded-md">
                        <h1 className="text-xl font-bold capitalize">Test: {testDetails?.name}</h1>
                        <div className="flex gap-3 items-center">
                            <div className="p-2 rounded-md bg-slate-800">
                                Mark: <span className="text-green-500">1</span> 
                            </div>
                            <div className="p-2 rounded-md bg-slate-800">
                                Negative: <span className="text-red-500">{testDetails.negativeMarks ? "-0.25" : "0"}</span>  
                            </div>
                            <span className="mr-4 text-orange-600 text-2xl">Time Left: {`${minutes}:${seconds}`}</span>
                        
                        </div>
                    </div>
                    <h2 className="text-lg mb-2">{questions[currentQuestionIndex]?.question}</h2>
                    <div className="space-y-2">
                        {questions[currentQuestionIndex]?.options.map((option, idx) => (
                            <div key={idx} className={`${option===questions[currentQuestionIndex]?.userAnswer?"bg-gray-500":""} p-2 border border-gray-700 rounded cursor-pointer hover:bg-gray-700 `}
                                onClick={() => handleOptionSelect(option, currentQuestionIndex)}>
                                {option}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="mt-6 flex justify-between">
                    <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => handleNavigation("prev")} disabled={currentQuestionIndex === 0}>Previous</button>
                    <button className="px-4 py-2 bg-gray-700 rounded" onClick={handleClear}>Clear</button>
                    <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => handleNavigation("next")} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                </div>
            </div>

            {/* Right panel with status and submit button */}
            <div className="w-1/5 p-4 bg-gray-800 flex flex-col justify-between">
                <div className="pt-3">
                    <h2 className="text-lg font-bold">Question Status</h2>
                    <div className="grid grid-cols-5 gap-2  pt-5">
                        {questions.map((q, index) => (
                            <div key={index} className={`p-2 text-center rounded ${q.attempted ? "bg-green-500" : "bg-red-500"}`}>{index + 1}</div>
                        ))}
                    </div>
                </div>
                <button className="px-4 py-2 mt-6 bg-orange-600 hover:bg-orange-700 rounded" onClick={handleSubmit}>Submit Test</button>
            </div>
        </div>
    );
};

export default TestAttempt;
