import React, { useState } from 'react';

const categories = [
    {
        name: 'Catégorie 1',
        subCategories: ['Sous-catégorie 1.1', 'Sous-catégorie 1.2', 'Sous-catégorie 1.3', 'Sous-catégorie 1.4'],
    },
    {
        name: 'Catégorie 2',
        subCategories: ['Sous-catégorie 2.1', 'Sous-catégorie 2.2', 'Sous-catégorie 2.3', 'Sous-catégorie 2.4'],
    },
    {
        name: 'Catégorie 3',
        subCategories: ['Sous-catégorie 3.1', 'Sous-catégorie 3.2', 'Sous-catégorie 3.3', 'Sous-catégorie 3.4'],
    },
    {
        name: 'Catégorie 4',
        subCategories: ['Sous-catégorie 4.1', 'Sous-catégorie 4.2', 'Sous-catégorie 4.3', 'Sous-catégorie 4.4'],
    },
    {
        name: 'Catégorie 5',
        subCategories: ['Sous-catégorie 5.1', 'Sous-catégorie 5.2', 'Sous-catégorie 5.3', 'Sous-catégorie 5.4'],
    },
];

const Navigation = () => (
    <nav style={{ marginTop: '30px', backgroundColor: '#f8f9fa', padding: '10px 0' }}>
    <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }}>
        <li style={{ margin: '0 15px' }}>
            <a href={route('Accueil')} style={{ textDecoration: 'none', color: '#333' }}>Accueil</a>
        </li>
        <li style={{ margin: '0 15px' }}>
            <a href={route('activities')} style={{ textDecoration: 'none', color: '#333' }}>Activités</a>
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
    </ul>
</nav>
);

const Categorie = () => {
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (index) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    return (
        <div>
            <Navigation />
            <div style={{ padding: '20px' }}>
                {categories.map((category, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <div
                            onClick={() => toggleCategory(index)}
                            style={{
                                padding: '10px',
                                backgroundColor: '#e0e0e0',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>{category.name}</span>
                            <span>{openCategory === index ? '-' : '+'}</span>
                        </div>
                        {openCategory === index && (
                            <ul style={{ listStyle: 'none', padding: '10px', margin: 0 }}>
                                {category.subCategories.map((subCategory, subIndex) => (
                                    <li key={subIndex} style={{ marginBottom: '5px' }}>
                                        <button
                                            onClick={() => alert(`Vous avez cliqué sur ${subCategory}`)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'blue',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {subCategory}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorie;