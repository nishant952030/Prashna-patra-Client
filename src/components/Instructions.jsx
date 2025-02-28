import React from "react";

const Instructions = () => {
    return (
        <div className="p-6 pt-20 rounded-lg shadow-lg flex flex-col justify-between h-screen max-h-[calc(100vh-120px)]">
            <h2 className="text-2xl font-bold mb-4 mx-auto">
                Welcome to <span className="text-orange-600 text-4xl font-bold">Prashn Patra</span>
            </h2>

            <div className="bg-gray-700 rounded-lg w-fit p-5 mx-auto">
                <p className="mb-2">Follow these steps to create and manage your tests:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Step 1:</strong> Click on <b>"Create New Subject"</b> to add a subject.</li>
                    <li><strong>Step 2:</strong> Click on <b>"Create New Test"</b> under the selected subject.</li>
                    <li><strong>Step 3:</strong> Fill out the test creation form and generate the test.</li>
                    <li><strong>Step 4:</strong> Once the test is generated, you will see two options:</li>
                    <ul className="list-disc pl-10 space-y-2">
                        <li><b>"Attempt Now"</b> - Start the test immediately.</li>
                        <li><b>"Attempt Later"</b> - Save it for later.</li>
                    </ul>
                </ul>
            </div>

            <div className="bg-gray-700 rounded-lg w-fit p-5 mx-auto mt-4">
                <h3 className="text-lg font-semibold mb-2">Viewing Scores & Solutions:</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>For smaller screens:</b> Open the sidebar ➝ Choose a subject ➝ Click on the test ➝ View your score and solutions.</li>
                    <li><b>For larger screens:</b> The sidebar is already open ➝ Choose a subject ➝ Click on the test ➝ View your score and solutions.</li>
                </ul>
            </div>

            <p className="mt-4 mx-auto">If you need help, refer to the documentation or contact support.</p>
        </div>
    );
};

export default Instructions;
