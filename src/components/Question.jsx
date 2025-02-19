import React, { useState } from "react";

const QuestionsDisplay = ({ response }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    if (!response || !response.questions) {
        return <p>No questions available.</p>;
    }

    return (
        <div className="p-6 space-y-4">
            {response.questions.map((q, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                    <p className="font-bold">{index + 1}. {q.question}</p>
                    {q.options.map((option, idx) => (
                        <label key={idx} className="block">
                            <input
                                type="radio"
                                name={`q${index}`}
                                value={option}
                                onChange={() => setSelectedAnswers(prev => ({
                                    ...prev,
                                    [index]: option
                                }))}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default QuestionsDisplay;
