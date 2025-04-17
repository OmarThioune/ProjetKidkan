import { Link, usePage } from '@inertiajs/react'

export default function NavBar() {
    const { auth } = usePage().props

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="space-x-4">
                <Link href="/" className="font-bold">Accueil</Link>
                <Link href="/recherche">Recherche</Link>
                <Link href="/apropos">À propos</Link>
                <Link href="/categorie">Catégories</Link>
                <Link href="/ajouter">Ajouter</Link>
                <Link href="/activite">Activité</Link>
                {auth.user && <Link href="/profil">Profil</Link>}
            </div>
            <div className="space-x-4">
                {auth.user ? (
                    <Link method="post" href="/logout" as="button">Déconnexion</Link>
                ) : (
                    <>
                        <Link href="/login">Connexion</Link>
                        <Link href="/register">Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
