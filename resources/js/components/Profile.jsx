import { usePage } from '@inertiajs/react';

export default function Profile() {
    const { auth } = usePage().props;

    return (
        <div className="p-8">
            <h1 className="text-2xl">Profil de {auth.user.name}</h1>
            <p>Email : {auth.user.email}</p>
        </div>
    );
}
