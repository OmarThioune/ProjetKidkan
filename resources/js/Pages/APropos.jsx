import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const APropos = () => {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user; // Check if user is logged in

    const content = (
        <div className="p-6">
            <h2 className="text-xl font-semibold">À Propos</h2>
            <p>Ceci est la page à propos.</p>
        </div>
    );

    return isLoggedIn ? <AuthenticatedLayout>{content}</AuthenticatedLayout> : content;
};

export default APropos;