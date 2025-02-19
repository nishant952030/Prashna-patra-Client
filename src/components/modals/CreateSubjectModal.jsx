import { useState } from "react";
import axios from "axios";

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
            const response = await axios.post(`${process.env.SUBJECT_URL}/create-subject`, { subject },{withCredentials:true});
            if (!response.data.success) {
                setError(response.data.message);
                return
            }
            onSubjectCreated(response.data.subject); // Callback function to update UI
            onClose(); // Close modal
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create subject");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Create New Subject</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter subject name"
                        value={subject}
                        onChange={(e) => setsubject(e.target.value)}
                        className="w-full p-2 border border-orange-600 rounded mb-4 bg-gray-600 outline-none"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-600 text-white rounded disabled:bg-orange-300"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubjectModal;
