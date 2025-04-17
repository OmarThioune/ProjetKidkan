import React from 'react';

const Accueil = () => {
    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img 
                                src="/Images/kidkan-logo.png" 
                                alt="KidKan Logo" 
                                style={{ width: '200px', height: 'auto' }} 
                            />
                            <h1 style={{ fontSize: '24px', marginTop: '10px', textAlign: 'center' }}>Le monde des enfants, à portée de main</h1>
                        </div>

                        {/* Navigation Bar */}
            <nav style={{ marginTop: '30px', backgroundColor: '#f8f9fa', padding: '10px 0' }}>
                <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }}>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/accueil" style={{ textDecoration: 'none', color: '#333' }}>Accueil</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/recherche" style={{ textDecoration: 'none', color: '#333' }}>Recherche</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/categorie" style={{ textDecoration: 'none', color: '#333' }}>Catégorie</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/apropos" style={{ textDecoration: 'none', color: '#333' }}>À propos</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/ajouter" style={{ textDecoration: 'none', color: '#333' }}>Ajouter</a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                        <a href="/activite" style={{ textDecoration: 'none', color: '#333' }}>Activité</a>
                    </li>
                </ul>
            </nav>

            {/* Activities Section */}
            <div style={{ marginTop: '30px', overflow: 'hidden', width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        animation: 'scroll 10s linear infinite',
                        padding: '0 20px',
                    }}
                >
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 calc(100% / 5)',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                textAlign: 'left',
                            }}
                        >
                            <h3>Activité {index + 1}</h3>
                            <p>Description de l'activité {index + 1}.</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>
            {`
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-100%);
                }
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