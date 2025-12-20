import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateSubjectModal from "./modals/CreateSubjectModal";
import { Menu, X, Plus, BookOpen, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

const Sidebar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [totalSubjects, setTotalSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null); // Add error state

    const { subjectId } = useParams();

    useEffect(() => {
        const fetchSubjects = async () => {
            setSubjectLoading(true);
            setError(null); // Clear previous errors
            try {
                const response = await axios.get(`${process.env.REACT_APP_SUBJECT_URL}/all-subjects`, { withCredentials: true });
                console.log("Subjects API Response:", response.data); // DEBUG
                if (response.data.success) {
                    setTotalSubjects(response.data.allSubjects);
                    console.log("Subjects set:", response.data.allSubjects); // DEBUG
                } else {
                    setError("Failed to load subjects");
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
                setError(error.message);
            } finally {
                setSubjectLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    const onSubjectCreated = (subject) => {
        setTotalSubjects((subjects) => [...subjects, subject]);
    };

    const containerVariants = {
        open: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                reverseOrder: true,
            },
        },
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
        closed: { y: 20, opacity: 0 },
    };

    return (
        <>
            {/* Overlay for mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Toggle Button - Mobile Only */}
            <motion.button
                className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full shadow-xl text-white transition duration-300 flex items-center justify-center"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-96 lg:h-[calc(100vh-60px)] bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl text-white p-6 shadow-2xl border-r border-white/10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 pb-4 border-b border-white/10"
                >
                    <div className="flex items-center gap-2">
                        <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                            <BookOpen size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Subjects
                            </h2>
                            <p className="text-xs text-gray-300 mt-0.5">
                                {subjectLoading ? "Loading..." : `${totalSubjects.length} subjects`}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Subjects List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                    {subjectLoading ? (
                        <div className="h-full flex justify-center items-center">
                            <div className="flex flex-col items-center gap-3">
                                <ClipLoader color="#fb923c" size={40} />
                                <p className="text-sm text-gray-300">Loading subjects...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="h-full flex justify-center items-center">
                            <div className="flex flex-col items-center gap-3 text-center p-4">
                                <p className="text-sm text-red-400">Error: {error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-xs px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : totalSubjects && totalSubjects.length > 0 ? (
                        <ul className="space-y-2">
                            {totalSubjects.map((subject) => (
                                <li key={subject._id}>
                                    <Link
                                        to={`/home/subject/${subject._id}`}
                                        className={`block p-4 rounded-lg transition duration-300 group overflow-hidden border
                                            ${subjectId === subject._id
                                                ? "bg-orange-600/20 border-orange-500/50 shadow-lg shadow-orange-500/20"
                                                : "bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Icon */}
                                            <div
                                                className={`p-2 rounded-lg flex-shrink-0 transition duration-300
                                                    ${subjectId === subject._id
                                                        ? "bg-orange-600 text-white"
                                                        : "bg-slate-600 text-gray-200 group-hover:bg-orange-600/40 group-hover:text-orange-300"
                                                    }`}
                                            >
                                                <Zap size={18} />
                                            </div>

                                            {/* Subject Name */}
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-semibold text-sm uppercase tracking-wider truncate transition duration-300
                                                    ${subjectId === subject._id
                                                        ? "text-orange-300"
                                                        : "text-white group-hover:text-orange-300"
                                                    }`}>
                                                    {subject.subjectName}
                                                </p>
                                            </div>

                                            {/* Active Indicator */}
                                            {subjectId === subject._id && (
                                                <div className="w-2 h-2 rounded-full bg-orange-400" />
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="h-full flex justify-center items-center">
                            <div className="flex flex-col items-center gap-3 text-center">
                                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                    <BookOpen size={32} className="text-gray-400 mx-auto" />
                                </div>
                                <p className="text-gray-300 text-sm">No subjects yet</p>
                                <p className="text-gray-400 text-xs">Create your first subject to get started</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Create Button */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2 border border-orange-400/30"
                    >
                        <Plus size={20} />
                        <span>Create New Subject</span>
                    </button>
                </div>

                {/* Footer Info */}
                <div className="text-center text-xs text-gray-400 mt-3">
                    <p>Organize your learning</p>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed lg:hidden top-16 left-0 w-80 h-[calc(100vh-60px)] bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl text-white p-6 shadow-2xl border-r border-white/10 z-40 flex flex-col"
                    >
                        {/* Header */}
                        <div className="mb-6 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                                    <BookOpen size={20} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Subjects
                                    </h2>
                                    <p className="text-xs text-gray-300 mt-0.5">
                                        {subjectLoading ? "Loading..." : `${totalSubjects.length} subjects`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subjects List */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                            {subjectLoading ? (
                                <div className="h-full flex justify-center items-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <ClipLoader color="#fb923c" size={40} />
                                        <p className="text-sm text-gray-300">Loading subjects...</p>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="h-full flex justify-center items-center">
                                    <div className="flex flex-col items-center gap-3 text-center p-4">
                                        <p className="text-sm text-red-400">Error: {error}</p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="text-xs px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </div>
                            ) : totalSubjects && totalSubjects.length > 0 ? (
                                <ul className="space-y-2">
                                    {totalSubjects.map((subject) => (
                                        <li key={subject._id}>
                                            <Link
                                                to={`/home/subject/${subject._id}`}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={`block p-4 rounded-lg transition duration-300 group overflow-hidden border
                                                    ${subjectId === subject._id
                                                        ? "bg-orange-600/20 border-orange-500/50 shadow-lg shadow-orange-500/20"
                                                        : "bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {/* Icon */}
                                                    <div
                                                        className={`p-2 rounded-lg flex-shrink-0 transition duration-300
                                                            ${subjectId === subject._id
                                                                ? "bg-orange-600 text-white"
                                                                : "bg-slate-600 text-gray-200 group-hover:bg-orange-600/40 group-hover:text-orange-300"
                                                            }`}
                                                    >
                                                        <Zap size={18} />
                                                    </div>

                                                    {/* Subject Name */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-semibold text-sm uppercase tracking-wider truncate transition duration-300
                                                            ${subjectId === subject._id
                                                                ? "text-orange-300"
                                                                : "text-white group-hover:text-orange-300"
                                                            }`}>
                                                            {subject.subjectName}
                                                        </p>
                                                    </div>

                                                    {/* Active Indicator */}
                                                    {subjectId === subject._id && (
                                                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="h-full flex justify-center items-center">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                            <BookOpen size={32} className="text-gray-400 mx-auto" />
                                        </div>
                                        <p className="text-gray-300 text-sm">No subjects yet</p>
                                        <p className="text-gray-400 text-xs">Create your first subject to get started</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Create Button */}
                        <div className="pt-4 border-t border-white/10 mt-auto">
                            <button
                                onClick={() => {
                                    setOpenModal(true);
                                    setIsSidebarOpen(false);
                                }}
                                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2 border border-orange-400/30"
                            >
                                <Plus size={20} />
                                <span>Create New Subject</span>
                            </button>
                        </div>

                        {/* Footer Info */}
                        <div className="text-center text-xs text-gray-400 mt-3">
                            <p>Organize your learning</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {openModal && (
                    <CreateSubjectModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        onSubjectCreated={onSubjectCreated}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
