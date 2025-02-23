import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateSubjectModal from "./modals/CreateSubjectModal";
import { Menu, X } from "lucide-react"; // Lucide React icons
import { motion } from "framer-motion";
const Sidebar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [totalSubjects, setTotalSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle state

    const { subjectId } = useParams(); // Highlight selected subject

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
    const variants = {
        open: { x: "90vw" }, // Move to right
        closed: { x: "0vw" }, // Move to left
    };
    return (
        <>
            {/* Toggle Button (Visible on Small Screens) */}
            <motion.button
                className={`lg:hidden fixed top-1/2 z-50 bg-orange-500 bg-opacity-95 p-3 rounded-full shadow-lg text-white`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>

            {/* Sidebar (Hidden on Small Screens) */}
            <div className={`fixed lg:relative lg:top-0 top-16 left-0 h-[calc(100vh-4rem)] sm:w-96 w-full bg-gray-800 text-white p-4 shadow-lg 
transform transition-transform duration-300 rounded-tr-md rounded-br-md
${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-96`}>

                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Subjects</h2>
                        <div className="h-full w-full overflow-y-auto">
                            <ul>
                                {totalSubjects.map((subject) => (
                                    <li key={subject._id}>
                                        <Link
                                            to={`/home/subject/${subject._id}`}
                                            className={`block p-3 my-2 rounded-lg transition 
                                                ${subjectId === subject._id ? "bg-orange-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                                            onClick={() => {
                                                if (isSidebarOpen) {
                                                    setIsSidebarOpen(false);
                                             }}}
                                        >
                                            <span className="uppercase">{subject.subjectName}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button className="bg-orange-600 p-2 w-full rounded-md mt-auto" onClick={() => setOpenModal(true)}>
                            Create New Subject
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && <CreateSubjectModal isOpen={openModal} onClose={() => setOpenModal(false)} onSubjectCreated={onSubjectCreated} />}
        </>
    );
};

export default Sidebar;
