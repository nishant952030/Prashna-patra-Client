import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFeedbackForm } from "../redux/feedback";

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        experience: "",
        featureRequest: "",
        email: "",
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", formData);   dispatch(setFeedbackForm(false));
    };
    const cancelHandle = () => {
        dispatch(setFeedbackForm(false));
   }
    return (
        <div className="bg-black/75 flex justify-center items-center w-full min-h-screen absolute top-0 left-0">
            <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-lg bg-gray-800 border border-orange-200 h-fit opacity-100">
                <h2 className="text-xl font-semibold mb-4 text-center text-white">Feedback Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-medium text-white">How was your experience?</label>
                    <div className="flex flex-col space-y-2 text-white">
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="Excellent"
                                checked={formData.experience === "Excellent"}
                                onChange={handleChange}
                            />
                            Excellent
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="Good"
                                checked={formData.experience === "Good"}
                                onChange={handleChange}
                            />
                            Good
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="Average"
                                checked={formData.experience === "Average"}
                                onChange={handleChange}
                            />
                            Average
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="experience"
                                value="Poor"
                                checked={formData.experience === "Poor"}
                                onChange={handleChange}
                            />
                            Poor
                        </label>
                    </div>

                    <label className="block font-medium text-white">Feature requests or issues?</label>
                    <textarea
                        name="featureRequest"
                        value={formData.featureRequest}
                        onChange={handleChange}
                        placeholder="Your feedback here..."
                        className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    />

                    <label className="block font-medium text-white">Your Email (Optional)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full p-2 border rounded-lg bg-gray-700 text-white outline-none"
                    />

                    <div className="flex flex-row justify-end gap-3 mt-4">
                        <button onClick={cancelHandle} type="button" className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all">
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
