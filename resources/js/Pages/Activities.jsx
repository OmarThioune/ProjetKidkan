import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaListUl } from "react-icons/fa";
import Activite from "./Activite";
import Map from "./Map";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const ActivitiesPage = () => {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    const [view, setView] = useState("list");

    return (
        isLoggedIn ? (
            <AuthenticatedLayout>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <motion.div
                        className="relative w-40 h-10 rounded-md flex items-center justify-between px-3 cursor-pointer border border-gray-500"
                        onClick={() => setView(view === "list" ? "map" : "list")}
                    >
                        <motion.span
                            className="absolute left-4 text-xl text-gray-800"
                            animate={{ opacity: view === "list" ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaListUl />
                        </motion.span>

                        <motion.span
                            className="absolute right-4 text-xl text-gray-800"
                            animate={{ opacity: view === "list" ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaMapMarkerAlt />
                        </motion.span>

                        <motion.div
                            className="w-16 h-8 rounded-md shadow-md flex items-center justify-center text-white"
                            animate={{ x: view === "list" ? 0 : 80, backgroundColor: view === "list" ? "#3498db" : "#e74c3c" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {view === "list" ? <FaListUl /> : <FaMapMarkerAlt />}
                        </motion.div>
                    </motion.div>

                    {view === "list" ? <Activite /> : <Map />}
                </div>
            </AuthenticatedLayout>
        ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                    className="relative w-40 h-10 rounded-md flex items-center justify-between px-3 cursor-pointer border border-gray-500"
                    onClick={() => setView(view === "list" ? "map" : "list")}
                >
                    <motion.span
                        className="absolute left-4 text-xl text-gray-800"
                        animate={{ opacity: view === "list" ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaListUl />
                    </motion.span>

                    <motion.span
                        className="absolute right-4 text-xl text-gray-800"
                        animate={{ opacity: view === "list" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaMapMarkerAlt />
                    </motion.span>

                    <motion.div
                        className="w-16 h-8 rounded-md shadow-md flex items-center justify-center text-white"
                        animate={{ x: view === "list" ? 0 : 80, backgroundColor: view === "list" ? "#3498db" : "#e74c3c" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {view === "list" ? <FaListUl /> : <FaMapMarkerAlt />}
                    </motion.div>
                </motion.div>

                {view === "list" ? <Activite /> : <Map />}
            </div>
        )
    );
};

export default ActivitiesPage;