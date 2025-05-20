import { useState } from "react";
import { usePage } from "@inertiajs/react"; // ✅ Get authentication status
import AjouterActivite from "./AjouterActivite";
import Sub from "./Sub";
import Instance from "./Instance";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // ✅ Import AuthenticatedLayout

const ActivityManager = () => {
    const { auth } = usePage().props; // ✅ Check if user is logged in
    const isLoggedIn = !!auth.user; // ✅ Convert to boolean for easy check
    const [activeForm, setActiveForm] = useState("activity");

    const content = (
        <div className="flex flex-col items-center space-y-4">
            {/* Switch Button */}
            <div className="flex space-x-2">
                <button
                    className={`px-4 py-2 rounded ${activeForm === "activity" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    onClick={() => setActiveForm("activity")}
                >
                    Add Activity
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeForm === "subActivity" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    onClick={() => setActiveForm("subActivity")}
                >
                    Add Sub-Activity
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeForm === "instance" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    onClick={() => setActiveForm("instance")}
                >
                    Add Instance
                </button>
            </div>

            {/* Render the Selected Form */}
            <div className="w-full max-w-lg">
                {activeForm === "activity" && <AjouterActivite />}
                {activeForm === "subActivity" && <Sub />}
                {activeForm === "instance" && <Instance />}
            </div>
        </div>
    );

    return isLoggedIn ? <AuthenticatedLayout>{content}</AuthenticatedLayout> : content;
};

export default ActivityManager;