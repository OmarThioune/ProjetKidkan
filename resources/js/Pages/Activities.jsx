import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaListUl } from "react-icons/fa";
import Activite from "./Activite";
import Map from "./Map";

const ActivitiesPage = () => {
    const [view, setView] = useState("list");

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Transparent Background Switch */}
            <motion.div
                className="relative w-40 h-10 rounded-md flex items-center justify-between px-3 cursor-pointer border border-gray-500"
                onClick={() => setView(view === "list" ? "map" : "list")}
            >
                {/* Left Icon (Fades Out When Button Moves Away) */}
                <motion.span
                    className="absolute left-4 text-xl text-gray-800"
                    animate={{ opacity: view === "list" ? 0 : 1 }} // Icon disappears when button moves right
                    transition={{ duration: 0.3 }}
                >
                    <FaListUl />
                </motion.span>

                {/* Right Icon (Fades Out When Button Moves Away) */}
                <motion.span
                    className="absolute right-4 text-xl text-gray-800"
                    animate={{ opacity: view === "list" ? 1 : 0 }} // Icon disappears when button moves left
                    transition={{ duration: 0.3 }}
                >
                    <FaMapMarkerAlt />
                </motion.span>

                {/* Moving Toggle Button (Only This is Colored) */}
                <motion.div
                    className="w-16 h-8 rounded-md shadow-md flex items-center justify-center text-white"
                    animate={{ x: view === "list" ? 0 : 80, backgroundColor: view === "list" ? "#3498db" : "#e74c3c" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {view === "list" ? <FaListUl /> : <FaMapMarkerAlt />}
                </motion.div>
            </motion.div>

            {/* Display the Correct Component */}
            {view === "list" ? <Activite /> : <Map />}
        </div>
    );
};

export default ActivitiesPage;