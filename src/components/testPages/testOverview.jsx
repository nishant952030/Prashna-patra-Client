import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Trash2, BookOpen, Zap, Play, Eye, BarChart3, Award, Target } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setQuestions, setTimeStartedAt, setTestDetails, setIsTestOn } from "../../redux/questionSlice";

const TestOverview = () => {
  const { subjectId } = useParams();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preparing, setPreparing] = useState(false);
  const [avg, setAvg] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);

  const [subjectdetails, setSubjectdetails] = useState(null);
  const [highest, setHighest] = useState(null);
  const [attemptedtest, setAttemptedTest] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_TEST_URL}/fetchTests/${subjectId}`,
          { withCredentials: true }
        );
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

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SUBJECT_URL}/subjectDetails/${subjectId}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setSubjectdetails(response.data.subject);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjectDetails();
  }, [subjectId, tests]);

  const attemptTest = (testId) => {
    setPreparing(true);
    fetchQuestions(testId);
  };

  const fetchQuestions = async (testId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TEST_URL}/testDetails/${testId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        const sanitizedQuestions = response.data.test.generatedQuestions.map(
          ({ correctAnswer, ...q }) => ({ ...q })
        );
        const testDetailsForRedux = {
          testId: response.data.test._id,
          name: response.data.test.title,
          timePerquestion: response.data.test.timeLimit,
          negativeMarks: response.data.test.negativeMarking,
          numberOfQuestions: response.data.test.numberOfQuestions,
        };
        dispatch(setQuestions(sanitizedQuestions));
        dispatch(setIsTestOn(true));
        dispatch(setTestDetails(testDetailsForRedux));
        dispatch(setTimeStartedAt(Date.now()));
        navigate("/attemptTest", { replace: true });
        setPreparing(false);
      }
    } catch (error) {
      console.log(error);
      setPreparing(false);
    }
  };

  const average = (testsArr) => {
    let totalScore = 0;
    let totalMarks = 0;
    let highestPercentage = 0;
    let attemptTestCount = 0;

    testsArr.forEach((test) => {
      if (test.isAttempted) {
        attemptTestCount += 1;
        totalScore += test.score;
        totalMarks += test.generatedQuestions.length;
        const currentPercentage =
          (test.score / test.generatedQuestions.length) * 100;
        highestPercentage = Math.max(highestPercentage, currentPercentage);
      }
    });

    setAttemptedTest(attemptTestCount);
    setHighest(highestPercentage.toFixed(2));

    return totalMarks > 0
      ? ((totalScore / totalMarks) * 100).toFixed(2)
      : "N/A";
  };

  const openTestForm = () => {
    navigate(`/createTest/${subjectId}`);
  };

  const handleTestDelete = (testId) => {
    setTests((prev) => prev.filter((test) => test._id !== testId));
  };

  const deletetest = async (testid) => {
    if (window.confirm("Do you want to delete this test?")) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_TEST_URL}/deleteTest/${testid}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          handleTestDelete(testid);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getSolution = async (testId) => {
    setShowSolutions(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/solutions/get-solutions/${testId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(setQuestions(response.data.questions));
        navigate("/solutions", { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSolutions(false);
    }
  };

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
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "hard":
        return "bg-red-500/20 border-red-500/50 text-red-300";
      case "medium":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
      case "easy":
        return "bg-green-500/20 border-green-500/50 text-green-300";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader color="#fb923c" size={50} />
          <p className="text-gray-300 font-medium">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <p className="text-red-400 font-semibold text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-clip flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* RIGHT: main test area (sidebar is a separate component) */}
      <div className="flex-1 h-full flex flex-col">
        <div className="h-full flex flex-col px-3 md:px-4 lg:px-6 py-3 md:py-4">
          {/* HEADER + STATS */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 flex-shrink-0"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent uppercase">
                    {subjectdetails?.subjectName || "Subject"}
                  </span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm">
                  Manage and track your test performance
                </p>
              </div>

              <motion.button
                onClick={openTestForm}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300 flex items-center gap-2 border border-orange-400/30 w-full md:w-auto text-sm md:text-base"
              >
                <Zap size={18} />
                Create New Test
              </motion.button>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  icon: BookOpen,
                  label: "Total Tests",
                  value: subjectdetails?.totalTests || 0,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Play,
                  label: "Attempted",
                  value: attemptedtest || 0,
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: BarChart3,
                  label: "Average Score",
                  value: `${avg}%`,
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Award,
                  label: "Highest Score",
                  value: `${highest}%`,
                  color: "from-orange-500 to-orange-600",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 md:p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 md:p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                      >
                        <Icon size={22} className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm font-medium">
                          {stat.label}
                        </p>
                        <p className="text-white font-bold text-lg md:text-2xl">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* TEST LIST (scrollable, denser) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
          >
            {tests.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-10 md:py-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg"
              >
                <BookOpen size={40} className="mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400 text-base md:text-lg">
                  No tests found for this subject.
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">
                  Create your first test to get started!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {tests.map((test) => (
                  <motion.div
                    key={test._id}
                    variants={itemVariants}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 hover:bg-white/10 transition duration-300 overflow-hidden group"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 flex items-center gap-2">
                          <Target size={18} className="text-orange-500" />
                          {test.title}
                        </h3>
                        <p
                          className="text-gray-400 text-xs md:text-sm cursor-pointer hover:text-gray-300 transition"
                          onClick={() =>
                            setExpanded((prev) => ({
                              ...prev,
                              [test._id]: !prev[test._id],
                            }))
                          }
                        >
                          {expanded[test._id]
                            ? test.description
                            : test.description
                              .split(" ")
                              .slice(0, 12)
                              .join(" ") +
                            (test.description.split(" ").length > 12
                              ? "..."
                              : "")}
                        </p>
                      </div>

                      <div
                        className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 whitespace-nowrap ${test.isAttempted
                            ? "bg-green-500/20 border border-green-500/50 text-green-300"
                            : "bg-gray-500/20 border border-gray-500/50 text-gray-300"
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${test.isAttempted ? "bg-green-400" : "bg-gray-400"
                            }`}
                        />
                        {test.isAttempted ? "Completed" : "Not Attempted"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 py-3 border-y border-white/10">
                      <div>
                        <p className="text-gray-500 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                          Questions
                        </p>
                        <p className="text-white font-bold text-sm md:text-base">
                          {test.attemptedQuestions}{" "}
                          <span className="text-gray-400">
                            / {test.generatedQuestions.length}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                          Difficulty
                        </p>
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] md:text-xs font-semibold border mt-1 ${getDifficultyColor(
                            test.difficulty
                          )}`}
                        >
                          {test.difficulty.charAt(0).toUpperCase() +
                            test.difficulty.slice(1)}
                        </span>
                      </div>

                      {test.isAttempted && (
                        <div>
                          <p className="text-gray-500 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                            Score / %
                          </p>
                          <p className="text-white font-bold text-sm md:text-base">
                            <span className="text-green-400">
                              {test.score}
                            </span>{" "}
                            <span className="text-gray-400">
                              / {test.generatedQuestions.length}
                            </span>{" "}
                            <span className="text-gray-400">
                              (
                              {(
                                (test.score /
                                  test.generatedQuestions.length) *
                                100
                              ).toFixed(1)}
                              %)
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                      {!test.isAttempted ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => attemptTest(test._id)}
                          className="px-4 md:px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm md:text-base font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-orange-400/30 shadow hover:shadow-orange-500/50"
                        >
                          <Play size={16} />
                          Attempt Now
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => getSolution(test._id)}
                          className="px-4 md:px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm md:text-base font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-blue-400/30 shadow hover:shadow-blue-500/50"
                        >
                          <Eye size={16} />
                          See Solutions
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deletetest(test._id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition duration-300 border border-transparent hover:border-red-500/50"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {preparing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 p-8 rounded-lg shadow-2xl border border-white/10 w-80 md:w-96"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-orange-500/20 rounded-full border border-orange-500/50">
                  <Zap size={30} className="text-orange-400 animate-spin" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white text-center">
                  Preparing Your Test
                </h2>
                <p className="text-gray-400 text-xs md:text-sm text-center">
                  Loading questions and configuration...
                </p>
                <div className="w-full mt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestOverview;
