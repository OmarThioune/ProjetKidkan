export default function Accueil() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-400 flex flex-col items-center justify-center text-white p-8">
            <div className="text-6xl font-extrabold mb-12 logo-3d">
                KIDKAN
            </div>
            <div className="space-x-6">
                <button className="btn-purple">Connexion</button>
                <button className="btn-purple">Inscription</button>
            </div>
        </div>
    );
}
