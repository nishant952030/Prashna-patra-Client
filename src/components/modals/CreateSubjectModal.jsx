import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateSubjectModal = ({ isOpen, onClose, onSubjectCreated }) => {
    const [subject, setsubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject.trim()) {
            setError("Subject name cannot be empty!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SUBJECT_URL}/create-subject`,
                { subject },
                { withCredentials: true }
            );

            if (!response.data.success) {
                setError(response.data.message);
                setLoading(false);
                return;
            }

            toast.success("Subject created successfully! 🎉");
            onSubjectCreated(response.data.subject);
            setsubject("");
            setError("");
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create subject");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-6 md:p-8 space-y-6"
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition"
                        >
                            <X size={20} className="text-white" />
                        </motion.button>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-3 pr-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30">
                                    <BookOpen size={24} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                        Create Subject
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Add a new subject to organize your studies
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            {/* Subject Name Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                                    Subject Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g., Mathematics, Physics, Chemistry..."
                                        value={subject}
                                        onChange={(e) => {
                                            setsubject(e.target.value);
                                            setError("");
                                        }}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-500/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        autoFocus
                                    />
                                    {subject.trim() && !error && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute right-3 top-3.5"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                                                <span className="text-green-400 text-sm font-bold">
                                                    ✓
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg"
                                >
                                    <p className="text-red-400 text-sm font-medium">
                                        ⚠️ {error}
                                    </p>
                                </motion.div>
                            )}

                            {/* Help Text */}
                            <p className="text-xs text-gray-400 px-1">
                                💡 Choose a clear subject name to organize your tests and
                                questions effectively.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading || !subject.trim()}
                                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-orange-500/50 border border-orange-400/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <ClipLoader color="white" size={16} />
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={20} />
                                            <span>Create</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.form>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="pt-4 border-t border-white/10 text-center text-xs text-gray-500"
                        >
                            <p>✨ You can add tests to this subject after creation</p>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateSubjectModal;
