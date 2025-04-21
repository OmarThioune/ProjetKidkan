import React, { useState } from "react";


const filterActivities = (activities, filters) => {
    return activities.filter((activity) => {
        const matchesCategory = filters.category ? activity.category === filters.category : true;
        const matchesSubCategory = filters.subCategory ? activity.subCategory === filters.subCategory : true;
        const matchesAge = filters.age
            ? activity.requiredAge.split("-").some((age) => parseInt(age) === parseInt(filters.age))
            : true;
        const matchesStartDate = filters.startDate ? new Date(activity.startDate) >= new Date(filters.startDate) : true;
        const matchesEndDate = filters.endDate ? new Date(activity.endDate) <= new Date(filters.endDate) : true;

        return matchesCategory && matchesSubCategory && matchesAge && matchesStartDate && matchesEndDate;
    });
};

const activities = [
    {
        id: 1,
        category: "Sport",
        subCategory: "Football",
        name: "A1 - FOOTBALL",
        startDate: "2023-11-01",
        endDate: "2023-11-30",
        remainingPlaces: 10,
        description: "Un sport collectif joué avec un ballon rond.",
        provider: "Club Sportif Local",
        requiredEquipment: "Chaussures de sport, tenue adaptée",
        level: "Débutant",
        address: "123 Rue du Stade, Paris",
        coordinates: { lat: 48.8566, lng: 2.3522 },
        requiredAge: "8-12 ans",
        children: [
            { id: 1, name: "Ali", age: 10 },
            { id: 2, name: "Sara", age: 9 },
        ],
    },
    {
        id: 2,
        category: "Art",
        subCategory: "Danse",
        name: "A2 - DANSE",
        startDate: "2023-12-01",
        endDate: "2023-12-31",
        remainingPlaces: 5,
        description: "Apprenez les bases de la danse classique.",
        provider: "Académie de Danse",
        requiredEquipment: "Chaussons de danse, tenue confortable",
        level: "Intermédiaire",
        address: "45 Rue de l'Opéra, Lyon",
        coordinates: { lat: 45.764, lng: 4.8357 },
        requiredAge: "6-10 ans",
        children: [
            { id: 3, name: "Omar", age: 7 },
            { id: 4, name: "Leila", age: 8 },
        ],
    },
    {
        id: 3,
        category: "Sport",
        subCategory: "Natation",
        name: "A3 - NATATION",
        startDate: "2023-10-15",
        endDate: "2023-11-15",
        remainingPlaces: 8,
        description: "Cours de natation pour débutants.",
        provider: "Piscine Municipale",
        requiredEquipment: "Maillot de bain, bonnet, lunettes",
        level: "Débutant",
        address: "10 Rue de la Piscine, Marseille",
        coordinates: { lat: 43.2965, lng: 5.3698 },
        requiredAge: "7-12 ans",
        children: [
            { id: 5, name: "Yasmine", age: 9 },
            { id: 6, name: "Karim", age: 11 },
        ],
    },
    {
        id: 4,
        category: "Art",
        subCategory: "Peinture",
        name: "A4 - PEINTURE",
        startDate: "2023-11-10",
        endDate: "2023-12-10",
        remainingPlaces: 12,
        description: "Atelier de peinture pour enfants.",
        provider: "Centre Artistique",
        requiredEquipment: "Pinceaux, peinture, tablier",
        level: "Tous niveaux",
        address: "78 Rue des Arts, Bordeaux",
        coordinates: { lat: 44.8378, lng: -0.5792 },
        requiredAge: "6-14 ans",
        children: [
            { id: 7, name: "Nour", age: 8 },
            { id: 8, name: "Hassan", age: 10 },
        ],
    },
    {
        id: 5,
        category: "Jeux de Société",
        subCategory: "Échecs",
        name: "A5 - ÉCHECS",
        startDate: "2023-11-20",
        endDate: "2023-12-20",
        remainingPlaces: 6,
        description: "Apprenez les bases des échecs.",
        provider: "Club d'Échecs",
        requiredEquipment: "Aucun",
        level: "Débutant",
        address: "5 Rue des Stratèges, Toulouse",
        coordinates: { lat: 43.6047, lng: 1.4442 },
        requiredAge: "8-15 ans",
        children: [
            { id: 9, name: "Amine", age: 12 },
            { id: 10, name: "Salma", age: 9 },
        ],
    },
    {
        id: 6,
        category: "Musique",
        subCategory: "Guitare",
        name: "A6 - GUITARE",
        startDate: "2023-11-05",
        endDate: "2023-12-05",
        remainingPlaces: 7,
        description: "Cours de guitare pour débutants.",
        provider: "École de Musique",
        requiredEquipment: "Guitare acoustique",
        level: "Débutant",
        address: "12 Rue des Mélodies, Lille",
        coordinates: { lat: 50.6292, lng: 3.0573 },
        requiredAge: "10-15 ans",
        children: [
            { id: 11, name: "Rania", age: 12 },
            { id: 12, name: "Samir", age: 14 },
        ],
    },
    {
        id: 7,
        category: "Cuisine",
        subCategory: "Pâtisserie",
        name: "A7 - PÂTISSERIE",
        startDate: "2023-11-15",
        endDate: "2023-12-15",
        remainingPlaces: 9,
        description: "Atelier de pâtisserie pour enfants.",
        provider: "Atelier Gourmand",
        requiredEquipment: "Tablier, ustensiles de cuisine",
        level: "Tous niveaux",
        address: "34 Rue des Délices, Nantes",
        coordinates: { lat: 47.2184, lng: -1.5536 },
        requiredAge: "8-13 ans",
        children: [
            { id: 13, name: "Maya", age: 10 },
            { id: 14, name: "Adam", age: 11 },
        ],
    },
    {
        id: 8,
        category: "Technologie",
        subCategory: "Programmation",
        name: "A8 - PROGRAMMATION",
        startDate: "2023-11-20",
        endDate: "2023-12-20",
        remainingPlaces: 10,
        description: "Introduction à la programmation pour enfants.",
        provider: "Code Academy Junior",
        requiredEquipment: "Ordinateur portable",
        level: "Débutant",
        address: "56 Rue des Innovateurs, Grenoble",
        coordinates: { lat: 45.1885, lng: 5.7245 },
        requiredAge: "10-14 ans",
        children: [
            { id: 15, name: "Lina", age: 12 },
            { id: 16, name: "Youssef", age: 13 },
        ],
    },
    {
        id: 9,
        category: "Sport",
        subCategory: "Basketball",
        name: "A9 - BASKETBALL",
        startDate: "2023-11-10",
        endDate: "2023-12-10",
        remainingPlaces: 8,
        description: "Apprenez les bases du basketball.",
        provider: "Club de Basketball",
        requiredEquipment: "Chaussures de sport, tenue adaptée",
        level: "Débutant",
        address: "89 Rue des Sports, Nice",
        coordinates: { lat: 43.7102, lng: 7.262 },
        requiredAge: "9-13 ans",
        children: [
            { id: 17, name: "Ziad", age: 11 },
            { id: 18, name: "Aya", age: 10 },
        ],
    },
    {
        id: 10,
        category: "Nature",
        subCategory: "Jardinage",
        name: "A10 - JARDINAGE",
        startDate: "2023-11-25",
        endDate: "2023-12-25",
        remainingPlaces: 15,
        description: "Atelier de jardinage pour enfants.",
        provider: "Association Verte",
        requiredEquipment: "Gants, bottes",
        level: "Tous niveaux",
        address: "67 Rue des Fleurs, Montpellier",
        coordinates: { lat: 43.6119, lng: 3.8772 },
        requiredAge: "7-12 ans",
        children: [
            { id: 19, name: "Imane", age: 8 },
            { id: 20, name: "Bilal", age: 9 },
        ],
    },
    {
        id: 11,
        category: "Jeux de Société",
        subCategory: "Monopoly",
        name: "A11 - MONOPOLY",
        startDate: "2023-11-18",
        endDate: "2023-12-18",
        remainingPlaces: 10,
        description: "Parties de Monopoly pour enfants.",
        provider: "Club de Jeux",
        requiredEquipment: "Aucun",
        level: "Tous niveaux",
        address: "23 Rue des Joueurs, Strasbourg",
        coordinates: { lat: 48.5734, lng: 7.7521 },
        requiredAge: "8-14 ans",
        children: [
            { id: 21, name: "Selma", age: 10 },
            { id: 22, name: "Ilyas", age: 12 },
        ],
    },
    {
        id: 12,
        category: "Art",
        subCategory: "Théâtre",
        name: "A12 - THÉÂTRE",
        startDate: "2023-11-22",
        endDate: "2023-12-22",
        remainingPlaces: 6,
        description: "Atelier de théâtre pour enfants.",
        provider: "Compagnie Théâtrale",
        requiredEquipment: "Tenue confortable",
        level: "Intermédiaire",
        address: "90 Rue des Acteurs, Rennes",
        coordinates: { lat: 48.1173, lng: -1.6778 },
        requiredAge: "9-13 ans",
        children: [
            { id: 23, name: "Malik", age: 11 },
            { id: 24, name: "Sofia", age: 10 },
        ],
    },
];

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];
const categories = ["Art", "Sport", "Technologie"];
const ages = [6, 8, 10, 12, 14];
const datesDebut = ["2024-07-01", "2024-08-01", "2024-09-01"];
const datesFin = ["2024-07-31", "2024-08-31", "2024-09-30"];

const Activite = () => {
    const [expandedActivity, setExpandedActivity] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [filtreNiveau, setFiltreNiveau] = useState("");
    const [filtreAge, setFiltreAge] = useState("");
    const [filtreDebut, setFiltreDebut] = useState("");
    const [filtreFin, setFiltreFin] = useState("");

    const toggleDetails = (id) => {
        setExpandedActivity(expandedActivity === id ? null : id);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        // rien à faire ici, car le filtrage se fait dynamiquement en bas avec .filter()
    };

    const [showAvis, setShowAvis] = useState(null); // stocke l'ID de l'activité dont on affiche les avis
    const [commentaire, setCommentaire] = useState("");
    const [note, setNote] = useState(0);
    const [avisParActivite, setAvisParActivite] = useState({});

    const ajouterAvis = (idActivite) => {
        const nouvelAvis = { commentaire, note };
        setAvisParActivite((prev) => ({
            ...prev,
            [idActivite]: [...(prev[idActivite] || []), nouvelAvis]
        }));
        setCommentaire("");
        setNote(0);
    };

    const Etoiles = ({ note, setNote }) => (
        <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} onClick={() => setNote(n)} style={{ color: n <= note ? "gold" : "gray", fontSize: "20px" }}>★</span>
            ))}
        </div>
    );

    const filteredActivities = activities.filter((activity) => {
        return (
            (filtreCategorie === "" || activity.category === filtreCategorie) &&
            (filtreNiveau === "" || activity.level === filtreNiveau) &&
            (filtreAge === "" || activity.requiredAge === parseInt(filtreAge)) &&
            (filtreDebut === "" || activity.startDate === filtreDebut) &&
            (filtreFin === "" || activity.endDate === filtreFin)
        );
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            {/* Bouton pour afficher les filtres */}
            <button
                style={{
                    backgroundColor: "#444",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    cursor: "pointer",
                }}
                onClick={toggleFilters}
            >
                {showFilters ? "Cacher les filtres" : "Afficher les filtres"}
            </button>

            {/* Zone des filtres */}
            {showFilters && (
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px", justifyContent: "center" }}>
                    <select value={filtreCategorie} onChange={(e) => setFiltreCategorie(e.target.value)}>
                        <option value="">Toutes les catégories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select value={filtreNiveau} onChange={(e) => setFiltreNiveau(e.target.value)}>
                        <option value="">Tous les niveaux</option>
                        {niveaux.map((niveau) => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                        ))}
                    </select>

                    <select value={filtreAge} onChange={(e) => setFiltreAge(e.target.value)}>
                        <option value="">Tous les âges</option>
                        {ages.map((age) => (
                            <option key={age} value={age}>{age} ans</option>
                        ))}
                    </select>

                    <select value={filtreDebut} onChange={(e) => setFiltreDebut(e.target.value)}>
                        <option value="">Toutes les dates de début</option>
                        {datesDebut.map((date) => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>

                    <select value={filtreFin} onChange={(e) => setFiltreFin(e.target.value)}>
                        <option value="">Toutes les dates de fin</option>
                        {datesFin.map((date) => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>

                    <button
                        onClick={applyFilters}
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            alignSelf: "center"
                        }}
                    >
                        Appliquer les filtres
                    </button>
                </div>
            )}

            {/* Liste des activités filtrées */}
            {filteredActivities.map((activity) => (
                <div
                    key={activity.id}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "20px",
                        margin: "10px",
                        width: "80%",
                        textAlign: "center",
                    }}
                >
                    <h3>{activity.name}</h3>
                    <p><strong>Date début:</strong> {activity.startDate} | <strong>Date fin:</strong> {activity.endDate}</p>
                    <p><strong>Places restantes:</strong> {activity.remainingPlaces}</p>
                    <button
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => toggleDetails(activity.id)}
                    >
                        Consulter
                    </button>
                    {expandedActivity === activity.id && (
                        <div style={{ marginTop: "20px", textAlign: "left" }}>
                            <p><strong>Description:</strong> {activity.description}</p>
                            <p><strong>Fournisseur:</strong> {activity.provider}</p>
                            <p><strong>Matériel requis:</strong> {activity.requiredEquipment}</p>
                            <p><strong>Niveau:</strong> {activity.level}</p>
                            <div style={{ margin: "10px 0" }}>
                                <iframe
                                    title="Google Map"
                                    src={`https://www.google.com/maps?q=${activity.coordinates.lat},${activity.coordinates.lng}&z=15&output=embed`}
                                    width="100%"
                                    height="200"
                                    style={{ border: "0" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                                <p>{activity.address}</p>
                            </div>
                            <p><strong>Âge requis:</strong> {activity.requiredAge}</p>
                            <p><strong>Choisissez un enfant:</strong></p>
                            <select style={{ padding: "10px", width: "100%" }}>
                                {activity.children.map((child) => (
                                    <option key={child.id} value={child.id}>
                                        {child.name} ({child.age} ans)
                                    </option>
                                ))}
                            </select>
                            <div style={{ marginTop: "10px" }}>
                                <button
                                    style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                    }}
                                >
                                    S'inscrire
                                </button>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginRight: "1165px",
                                    }}
                                    onClick={() => toggleDetails(activity.id)}
                                >
                                    Fermer
                                </button>
                                <button
                                style={{
                                    backgroundColor: "#ff9800",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    
                                }}
                                onClick={() => setShowAvis(activity.id)}
                            >
                                Avis
                            </button>
                            
                            </div>
                        </div>
                    )}
                    {showAvis && (
    <div style={{ width: "80%", marginTop: "20px", marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Laisser un avis pour l'activité : {
            filteredActivities.find(a => a.id === showAvis)?.name
        }</h3>
        
        <Etoiles note={note} setNote={setNote} />
        
        <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            rows="4"
            style={{ width: "100%", marginTop: "10px", padding: "10px", borderRadius: "5px" }}
        />

        <div style={{ marginTop: "10px" }}>
            <button
                onClick={() => ajouterAvis(showAvis)}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px"
                }}
            >
                Envoyer
            </button>
            <button
                onClick={() => setShowAvis(null)}
                style={{
                    backgroundColor: "gray",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Fermer
            </button>
        </div>

        {/* Affichage des avis */}
        <div style={{ marginTop: "20px" , textAlign: "center" }}>
            <h4>Avis existants :</h4>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {(avisParActivite[showAvis] || []).length === 0 && <p>Aucun avis pour cette activité.</p>}
                {(avisParActivite[showAvis] || []).map((avis, index) => (
                    <div                   key={index}
                    style={{
                        marginBottom: "10px",
                        borderTop: "1px solid #ccc",
                        paddingTop: "10px",
                        width: "80%",
                        textAlign: "left",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        padding: "10px" }}>
                        <div>
                            {"★".repeat(avis.note) + "☆".repeat(5 - avis.note)}
                        </div>
                        <p>{avis.commentaire}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}
                </div>
            ))}

            

            {filteredActivities.length === 0 && <p>Aucune activité ne correspond aux filtres.</p>}
        </div>
    );
};

export default Activite;