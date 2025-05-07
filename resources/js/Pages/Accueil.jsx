import React from 'react';

const activities = [
    { name: "Danse Hip-Hop", description: "Bouger en rythme avec énergie.", rating: 4.5 },
    { name: "Cours de Piano", description: "Apprendre les bases du piano classique.", rating: 4.8 },
    { name: "Atelier Peinture", description: "Exprime ta créativité avec des couleurs.", rating: 4.2 },
    { name: "Football", description: "Jeu d'équipe et esprit sportif.", rating: 4.0 },
    { name: "Natation", description: "Maîtriser l’eau tout en s’amusant.", rating: 4.6 },
    { name: "Échecs", description: "Développer la stratégie et la logique.", rating: 4.7 },
    { name: "Yoga Enfant", description: "Se relaxer et bouger en douceur.", rating: 4.3 },
    { name: "Théâtre", description: "Jouer des rôles et améliorer sa confiance.", rating: 4.4 },
    { name: "Cuisine Créative", description: "Faire des recettes amusantes et savoureuses.", rating: 4.1 },
    { name: "Informatique", description: "Apprendre les bases du codage.", rating: 4.9 },
];

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <>
            {"★".repeat(fullStars)}
            {halfStar && "☆"}
            {"☆".repeat(emptyStars)}
        </>
    );
};

const Accueil = () => {
    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                    src="/Images/kidkan-logo.png" 
                    alt="KidKan Logo" 
                    style={{ width: '200px', height: 'auto' }} 
                />
                <h1 style={{ fontSize: '24px', marginTop: '10px', textAlign: 'center' }}>
                    Le monde des enfants, à portée de main
                </h1>
            </div>

            {/* Navigation Bar */}
            <nav style={{ marginTop: '30px', backgroundColor: '#f8f9fa', padding: '10px 0' }}>
                <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }}>
                    <li style={{ margin: '0 15px' }}><a href="/accueil" style={{ textDecoration: 'none', color: '#333' }}>Accueil</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/recherche" style={{ textDecoration: 'none', color: '#333' }}>Profil</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/profile" style={{ textDecoration: 'none', color: '#333' }}>Authentification</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/activite" style={{ textDecoration: 'none', color: '#333' }}>Activité</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/ajouter" style={{ textDecoration: 'none', color: '#333' }}>Ajouter</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/apropos" style={{ textDecoration: 'none', color: '#333' }}>À propos</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/login" style={{ textDecoration: 'none', color: '#333' }}>Connexion</a></li>
                    <li style={{ margin: '0 15px' }}><a href="/instance" style={{ textDecoration: 'none', color: '#333' }}>Instance</a></li>

                </ul>
            </nav>

            {/* Activities Section */}
            <div style={{ marginTop: '30px', overflow: 'hidden', width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        animation: 'scroll 25s linear infinite',
                        padding: '0 20px',
                    }}
                >
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 calc(100% / 5)',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                textAlign: 'left',
                                backgroundColor: '#fefefe',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h3 style={{ marginBottom: '5px' }}>{activity.name}</h3>
                            <p style={{ fontSize: '14px', color: '#555' }}>{activity.description}</p>
                            <p style={{ fontSize: '16px', color: '#f39c12', margin: '5px 0' }}>
                                {renderStars(activity.rating)} ({activity.rating.toFixed(1)}/5)
                            </p>
                            <button
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => alert(`Voir les détails de : ${activity.name}`)}
                            >
                                Voir
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style>
            {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}
            </style>

            <footer style={{ marginTop: '50px', backgroundColor: '#e0f7fa', padding: '20px 0', textAlign: 'center' }}>
                <p>© {new Date().getFullYear()} KidKan. Tous droits réservés.</p>
                <p>Téléphone : +33 6 12 34 56 78</p>
                <p>Adresse : 123 Rue Imaginaire, 75000 Montréal , Canada</p>
                <p>Email : contact@kidkan.fr</p>
            </footer>
        </div>
    );
};

export default Accueil;
