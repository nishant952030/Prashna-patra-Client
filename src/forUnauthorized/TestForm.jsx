import { motion } from "framer-motion";
import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTestOn, setQuestions, setTestDetails, setTimeStartedAt } from "../redux/questionSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setUser } from "../redux/slice";
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
 const modalOpen=useSelector((store)=>store.unAuth.modalOpen)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [testGenerated, setTestGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [questions, setQuestion] = useState([]);
    const [showScoreModal, setShowscoreModal] = useState(modalOpen);
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
     
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home", { replace: true });
        }

    },[navigate,isLoggedIn])
     
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
                // Remove existing test data
                localStorage.removeItem('testData');

                // Store new test data
                localStorage.setItem('testData', JSON.stringify({
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
                }));

                setQuestion(response.data.jsonResponse.questions);
                toast.success("Test generated Successfully");
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
        console.log(questions);
        const sanitizedQuestions = questions.map(({ correctAnswer, ...q }) => ({
            ...q
        }));
        const testDetailsForRedux = {
            testId: null,
            name: formData.title,
            timePerquestion: formData.timePerQuestion,
            negativeMarks: formData.negative,
            numberOfQuestions: formData.questionCount
        }
        dispatch(setQuestions(sanitizedQuestions))
        dispatch(setIsTestOn(true))
        dispatch(setTestDetails(testDetailsForRedux))
        toast.success("Your test starts Now")
        dispatch(setTimeStartedAt(Date.now()))
        navigate("/guest/attemptTes t", { replace: true })

    }


    return (
        <div className="flex justify-center items-center bg-gray-900 h- min-h-[calc(100vh-64px)]">
                 {showScoreModal && <TestSubmission />}
            {!testGenerated ? (
                <motion.div
                    className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-6 space-y-6"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: shake ? [-10, 10, -10, 10, 0] : 0
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut"
                    }}
                >
                    {/* Shake Animation on Error */}
                    <h1
                        className="text-2xl font-bold text-white mb-6"

                    >
                        Create a new <span className="text-orange-500">Prashn Patra</span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="Enter test title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">
                                Topic
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="Enter test description"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Question Count
                                </label>
                                <input
                                    type="number"
                                    name="questionCount"
                                    value={formData.questionCount}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-gray-50"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2 flex gap-3 items-center">
                                <label className="block text-sm font-medium text-gray-200">
                                    Negative Marking
                                </label>
                                <input
                                    type="checkbox"
                                    name="negative"
                                    value={formData.negative}
                                    onChange={handleChange}
                                    min="1"
                                    className="px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Time Per Question (seconds)
                                </label>
                                <input
                                    type="number"
                                    name="timePerQuestion"
                                    value={formData.timePerQuestion}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-gray-50"
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Difficulty
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-gray-50"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Question Type
                                </label>
                                <select
                                    name="questionType"
                                    value={formData.questionType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-gray-50"
                                >
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="mixed">Mixed</option>
                                    <option value="truefalse">True/False</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
                        >
                            {!isGenerating ? `GenerateTest` : <ClipLoader color={"white"} size={20} />}
                        </button>
                        {error && <h6 className="text-red-500 text-sm mt-2">Please provide a title and description.</h6>}
                    </form>
                </motion.div>
            ) : (
                <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-2xl pb-4 font-semibold text-white">
                        Your <span className="text-orange-500">Prashn Patra</span> is generated. Kindly choose the option...
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="border border-orange-600 text-orange-700 hover:bg-orange-500 hover:text-white transition-colors px-5 py-3 rounded-lg shadow-md" onClick={attemptNow}>
                            Attempt Now
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default TestFormUnAuthorized;