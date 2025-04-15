import React, { useState } from 'react';

const Recherche = () => {
    const [niveau, setNiveau] = useState([]);
    const [activite, setActivite] = useState('');
    const [rue, setRue] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [categorie, setCategorie] = useState('');
    const [sousCategorie, setSousCategorie] = useState('');
    const [resultats, setResultats] = useState([]);

    const categories = {
        Sport: ['Football', 'Basketball', 'Tennis'],
        Musique: ['Guitare', 'Piano', 'Violon'],
        Art: ['Peinture', 'Sculpture', 'Dessin'],
    };

    const handleAppliquer = () => {
        // Simuler une recherche d'activités correspondant aux critères
        const mockResultats = [
            { id: 1, nom: 'Activité 1', categorie, sousCategorie, ville },
            { id: 2, nom: 'Activité 2', categorie, sousCategorie, ville },
        ];
        setResultats(mockResultats);
    };

    const handleReinitialiser = () => {
        setNiveau([]);
        setActivite('');
        setRue('');
        setVille('');
        setAdresse('');
        setCategorie('');
        setSousCategorie('');
        setResultats([]);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ width: '300px', marginRight: '20px' }}>
                <h2>Recherche</h2>
                <div>
                    <label>Niveau :</label>
                    <div>
                        {['Débutant', 'Intermédiaire', 'Avancé'].map((niv) => (
                            <label key={niv}>
                                <input
                                    type="checkbox"
                                    value={niv}
                                    checked={niveau.includes(niv)}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNiveau((prev) =>
                                            prev.includes(value)
                                                ? prev.filter((n) => n !== value)
                                                : [...prev, value]
                                        );
                                    }}
                                />
                                {niv}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label>Âge :</label>
                    <input
                        type="number"
                        value={activite} // Remplacer activite par age
                        onChange={(e) => setActivite(e.target.value)} // Remplacer setActivite par setAge
                    />
                </div>
                <div>
                    <label>Rue :</label>
                    <input
                        type="text"
                        value={rue}
                        onChange={(e) => setRue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ville :</label>
                    <input
                        type="text"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                    />
                </div>
                <div>
                    <label>Adresse :</label>
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                    />
                </div>
                <div>
                    <label>Catégorie :</label>
                    <select
                        value={categorie}
                        onChange={(e) => {
                            setCategorie(e.target.value);
                            setSousCategorie('');
                        }}
                    >
                        <option value="">-- Choisir une catégorie --</option>
                        {Object.keys(categories).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                {categorie && (
                    <div>
                        <label>Sous-catégorie :</label>
                        <select
                            value={sousCategorie}
                            onChange={(e) => setSousCategorie(e.target.value)}
                        >
                            <option value="">-- Choisir une sous-catégorie --</option>
                            {categories[categorie].map((subCat) => (
                                <option key={subCat} value={subCat}>
                                    {subCat}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div style={{ marginTop: '20px' }}>
                    <button
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: '10px',
                            marginRight: '10px',
                        }}
                        onClick={handleAppliquer}
                    >
                        Appliquer
                    </button>
                    <button
                        style={{
                            backgroundColor: 'gray',
                            color: 'white',
                            padding: '10px',
                        }}
                        onClick={handleReinitialiser}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
            <div>
                <h2>Résultats</h2>
                {resultats.length > 0 ? (
                    <ul>
                        {resultats.map((resultat) => (
                            <li key={resultat.id}>
                                {resultat.nom} - {resultat.categorie} ({resultat.sousCategorie})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun résultat trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default Recherche;