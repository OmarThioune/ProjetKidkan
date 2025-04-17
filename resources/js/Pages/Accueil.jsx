import React from 'react';

const Accueil = () => {
    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            {/* Logo Section */}
            <div style={{ marginTop: '50px' }}>
                <img 
                    src="/path/to/kidkan-logo.png" 
                    alt="KidKan Logo" 
                    style={{ width: '200px', height: 'auto' }} 
                />
                <h1 style={{ fontSize: '24px', marginTop: '10px' }}>Le monde des enfants, à portée de main</h1>
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
        </div>
    );
};

export default Accueil;