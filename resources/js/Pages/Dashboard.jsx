import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Accueil from "./Accueil";
import LoginDialog from "../Components/LoginDialog"; // ✅ Import Dialog Component

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <LoginDialog /> {/* ✅ Show dialog when user logs in */}

            <Accueil />
        </AuthenticatedLayout>
    );
}