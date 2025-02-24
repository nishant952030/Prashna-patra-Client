import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Trash2 } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { CircleCheck } from 'lucide-react';
import { setQuestions, setTimeStartedAt, setTestDetails, setIsTestOn } from "../../redux/questionSlice";
import { setUser } from "../../redux/slice";
const TestOverview = () => {
  const { subjectId } = useParams(); // Get subjectId from the URL
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preparing, setPreparing] = useState(false)
  const [avg, setAvg] = useState(null);
  const [expanded, setExpanded] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)
 
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/fetchTests/${subjectId}`, { withCredentials: true });
        setTests(response.data.tests);
        setAvg(average(response.data.tests));
      } catch (err) {

        console.error("Error fetching tests:", err);

        setError("Failed to fetch tests. Please try again.");

      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [subjectId]);


  const [subjectdetails, setSubjectdetails] = useState(null);
  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SUBJECT_URL}/subjectDetails/${subjectId}`, { withCredentials: true });
     
        if (response.data.success) {
          setSubjectdetails(response.data.subject);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubjectDetails();
  }, [subjectId, tests])

  const [highest, setHighest] = useState(null)

  const attemptTest = (testId) => {
    setPreparing(true)
    fetchQuestions(testId);
  }

  const fetchQuestions = async (testId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/testDetails/${testId}`, { withCredentials: true });
      if (response.data.success) {
        console.log(response.data.test.generatedQuestions)
        const sanitizedQuestions = response.data.test.generatedQuestions.map(({ correctAnswer, ...q }) => ({
          ...q
        }));
        const testDetailsForRedux = {
          testId: response.data.test._id,
          name: response.data.test.title,
          timePerquestion: response.data.test.timeLimit,
          negativeMarks: response.data.test.negativeMarking,
          numberOfQuestions: response.data.test.numberOfQuestions
        }
        dispatch(setQuestions(sanitizedQuestions))
        dispatch(setIsTestOn(true))
        dispatch(setTestDetails(testDetailsForRedux))

        dispatch(setTimeStartedAt(Date.now()))
        navigate("/attemptTest", { replace: true })
        setPreparing(false)

      }
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    finally {

    }
  }

  const [attemptedtest, setAttemptedTest] = useState(null);
  const average = (tests) => {
    let totalScore = 0;
    let totalMarks = 0;
    let highestPercentage = 0;
    let attemptTest = 0;
    tests.forEach(test => {
      console.log("Total Marks:", test.score);
      if (test.isAttempted) {
        attemptTest += 1;
        totalScore += test.score;
        totalMarks += test.generatedQuestions.length;


        let currentPercentage = (test.score / test.generatedQuestions.length) * 100;
        highestPercentage = Math.max(highestPercentage, currentPercentage);
      }
    });
    setAttemptedTest(attemptTest)
    setHighest(highestPercentage.toFixed(2));


    return totalMarks > 0 ? ((totalScore / totalMarks) * 100).toFixed(2) : "N/A";
  };



  if (loading)
    return <div className="text-gray-300">
      Loading tests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;




  const openTestForm = () => {
    navigate(`/createTest/${subjectId}`);
  }

  const handleTestDelete = (testId) => {
    const newTests = tests.filter((test) => test._id !== testId);
    setTests(newTests);
  };

  const deletetest = async (testid) => {
    if (window.confirm("Do you want to delete the test?")) {
      try {
        const testId = testid;
        const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/deleteTest/${testId}`, { withCredentials: true });
        if (response.data.success) {
          handleTestDelete(testId)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getSolution = async (testId) => {
    setShowSolutions(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/solutions/get-solutions/${testId}`, { withCredentials: true })
      if (response.data.success) {
        dispatch(setQuestions(response.data.questions));
        navigate("/solutions", { replace: true })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSolutions(false);
    }

  }

  return (
    <div className="sm:p-6 p-2 bg-gray-800 max-w-6xl w-full rounded-md h-screen max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-120px)] ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-orange-500 uppercase">{subjectdetails?.subjectName || "Subject"}</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-400 pt-2">
            <h2>Total Tests: {subjectdetails?.totalTests}</h2>
            <h2>Attempted: {attemptedtest}</h2>
            <h2>Average Score: {avg}%</h2>
            <h2>Highest Score: {highest}%</h2>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-orange-600 px-4 py-2 ml-auto text-white rounded-md font-semibold mt-4 md:mt-0"
            onClick={openTestForm}
          >
            Create New
          </button></div>
      </div>

      <hr className="mt-6" />

      {/* Test List */}
      {tests.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No tests found for this subject.</p>
      ) : (
        <ul className="space-y-4 pt-4 max-h-[calc(100%-120px)] overflow-y-auto">
          {tests.map((test) => (
            <li key={test._id} className="bg-gray-700 p-4 rounded-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Test Info */}
                <div className="w-full">
                  <h3 className="text-xl font-semibold text-white uppercase">{test.title}</h3>
                  <p
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded
                      ? test.description
                      : test.description.split(" ").slice(0, 10).join(" ") + (test.description.split(" ").length > 10 ? "..." : "")}
                  </p>

                  <div className="mt-2 text-sm">
                    <span className="text-gray-100">Questions: <span className="font-bold text-gray-300">{test.attemptedQuestions}</span> / {test.numberOfQuestions}</span>
                    <span className="ml-4">
                      Difficulty:{" "}
                      {test.difficulty === "hard" ? (
                        <span className="text-red-600">Hard</span>
                      ) : test.difficulty === "medium" ? (
                        <span className="text-yellow-600">Medium</span>
                      ) : (
                        <span className="text-green-600">Easy</span>
                      )}
                    </span>

                    {test.isAttempted && (
                      <span className="ml-4 text-blue-400">
                        Score: {test.score !== null ? (
                          <>
                            <span className="font-bold text-green-400">{test.score}</span> / {test.generatedQuestions.length}
                          </>
                        ) : "N/A"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 mt-4 md:mt-0 w-full">
                  <span className="p-2">{test.isAttempted ? <CircleCheck size={30} color={"green"} /> : <CircleCheck size={30} />}</span>
                  {!test.isAttempted ? <button
                    className="bg-orange-600 text-white px-3 py-2 rounded-md focus:bg-orange-700"
                    onClick={() => attemptTest(test._id)}
                  >
                    Attempt Now
                  </button> : <button
                    className="bg-orange-600 text-white px-3 py-2 rounded-md focus:bg-orange-700"
                    onClick={() => getSolution(test._id)}
                  >
                     See Solutions
                  </button>}
                  <button className="hover:bg-gray-500 p-2 rounded-full" onClick={() => deletetest(test._id)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Preparing Modal */}
      {preparing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-white">Your test is being prepared...</h2>
              <div className="flex justify-center items-center space-x-2">
                <ClipLoader color="#ea580c" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestOverview;
