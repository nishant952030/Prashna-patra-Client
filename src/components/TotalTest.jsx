import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateSubjectModal from "./modals/CreateSubjectModal";

const Sidebar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [totalSubjects, setTotalSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);

    const { subjectId } = useParams(); // Get subjectId from URL to highlight selected subject

    useEffect(() => {
        const fetchSubjects = async () => {
            setSubjectLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SUBJECT_URL}/all-subjects`, { withCredentials: true });
                if (response.data.success) {
                    setTotalSubjects(response.data.allSubjects);
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            } finally {
                setSubjectLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    const onSubjectCreated = (subject) => {
        setTotalSubjects((subjects) => [...subjects, subject]);
    };

    return (
        <div className="flex flex-col justify-between w-96 min-h-[calc(100vh-72px)] bg-gray-800 text-white p-4">
            <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Subjects</h2>
                <div className="h-full w-full overflow-y-scroll">
                    <ul>
                        {totalSubjects.map((subject) => (
                            <li key={subject._id}>
                                <Link
                                    to={`/home/subject/${subject._id}`}
                                    className={`block p-3 my-2 rounded-lg transition ${subjectId === subject._id ? "bg-orange-600 text-white" : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                >
                                    <span className="uppercase">{subject.subjectName}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <button className="bg-orange-600 p-2 w-full rounded-md" onClick={() => setOpenModal(true)}>
                    Create New Subject
                </button>
            </div>

            {/* Modal */}
            {openModal && <CreateSubjectModal isOpen={openModal} onClose={() => setOpenModal(false)} onSubjectCreated={onSubjectCreated} />}
        </div>
    );
};

export default Sidebar;
