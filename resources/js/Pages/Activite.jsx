import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Activite.css";

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];
const categories = ["Art", "Sport", "Technologie"];
const ages = [6, 8, 10, 12, 14];
const datesDebut = ["2024-07-01", "2024-08-01", "2024-09-01"];
const datesFin = ["2024-07-31", "2024-08-31", "2024-09-30"];

const Activite = () => {
    const [activities, setActivities] = useState([]);
    const [expandedActivity, setExpandedActivity] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [filtreNiveau, setFiltreNiveau] = useState("");
    const [filtreAge, setFiltreAge] = useState("");
    const [filtreDebut, setFiltreDebut] = useState("");
    const [filtreFin, setFiltreFin] = useState("");
    const [showAvis, setShowAvis] = useState(null);
    const [commentaire, setCommentaire] = useState("");
    const [note, setNote] = useState(0);
    const [avisParActivite, setAvisParActivite] = useState({});

    useEffect(() => {
        axios.get("/api/activities")
            .then((response) => {
                setActivities(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des activités:", error);
            });
    }, []);

    const toggleDetails = (id) => {
        setExpandedActivity(expandedActivity === id ? null : id);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

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
        <div className="etoiles">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} onClick={() => setNote(n)} className={n <= note ? "etoile-active" : "etoile"}>★</span>
            ))}
        </div>
    );

    const filteredActivities = activities.filter((activity) => {
        return (
            (filtreCategorie === "" || activity.category === filtreCategorie) &&
            (filtreNiveau === "" || activity.level === filtreNiveau) &&
            (filtreAge === "" || parseInt(activity.requiredAge) === parseInt(filtreAge)) &&
            (filtreDebut === "" || activity.startDate === filtreDebut) &&
            (filtreFin === "" || activity.endDate === filtreFin)
        );
    });

    return (
        <div className="container">
            <button className="toggle-filters-button" onClick={toggleFilters}>
                {showFilters ? "Cacher les filtres" : "Afficher les filtres"}
            </button>

            {showFilters && (
                <div className="filters-container">
                    <select value={filtreCategorie} onChange={(e) => setFiltreCategorie(e.target.value)}>
                        <option value="">Toutes les catégories</option>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <select value={filtreNiveau} onChange={(e) => setFiltreNiveau(e.target.value)}>
                        <option value="">Tous les niveaux</option>
                        {niveaux.map((niveau) => <option key={niveau} value={niveau}>{niveau}</option>)}
                    </select>

                    <select value={filtreAge} onChange={(e) => setFiltreAge(e.target.value)}>
                        <option value="">Tous les âges</option>
                        {ages.map((age) => <option key={age} value={age}>{age} ans</option>)}
                    </select>

                    <select value={filtreDebut} onChange={(e) => setFiltreDebut(e.target.value)}>
                        <option value="">Toutes les dates de début</option>
                        {datesDebut.map((date) => <option key={date} value={date}>{date}</option>)}
                    </select>

                    <select value={filtreFin} onChange={(e) => setFiltreFin(e.target.value)}>
                        <option value="">Toutes les dates de fin</option>
                        {datesFin.map((date) => <option key={date} value={date}>{date}</option>)}
                    </select>
                </div>
            )}

            {filteredActivities.map((activity) => (
                <div key={activity.id} className="activity-card">
                    <h3>{activity.name}</h3>
                    <p><strong>Date début:</strong> {activity.startDate} | <strong>Date fin:</strong> {activity.endDate}</p>
                    <p><strong>Places restantes:</strong> {activity.remainingPlaces}</p>
                    <button className="primary-button" onClick={() => toggleDetails(activity.id)}>Consulter</button>

                    {expandedActivity === activity.id && (
                        <div className="activity-details">
                            <p><strong>Description:</strong> {activity.description}</p>
                            <p><strong>Fournisseur:</strong> {activity.provider}</p>
                            <p><strong>Matériel requis:</strong> {activity.requiredEquipment}</p>
                            <p><strong>Niveau:</strong> {activity.level}</p>
                            <div className="map-container">
                                <iframe
                                    title="Google Map"
                                    src={`https://www.google.com/maps?q=${activity.coordinates?.lat},${activity.coordinates?.lng}&z=15&output=embed`}
                                    width="100%"
                                    height="200"
                                    style={{ border: "0" }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                                <p>{activity.address}</p>
                            </div>
                            <p><strong>Âge requis:</strong> {activity.requiredAge}</p>
                            {activity.children && (
                                <>
                                    <p><strong>Choisissez un enfant:</strong></p>
                                    <select className="child-select">
                                        {activity.children.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.name} ({child.age} ans)
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <div className="button-group">
                                <button className="success-button">S'inscrire</button>
                                <button className="danger-button" onClick={() => toggleDetails(activity.id)}>Fermer</button>
                                <button className="warning-button" onClick={() => setShowAvis(activity.id)}>Avis</button>
                            </div>
                        </div>
                    )}

                    {showAvis === activity.id && (
                        <div className="avis-section">
                            <h3>Laisser un avis pour l'activité : {activity.name}</h3>
                            <Etoiles note={note} setNote={setNote} />
                            <textarea
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                placeholder="Écrivez votre commentaire ici..."
                                rows="4"
                                className="commentaire-textarea"
                            />
                            <div className="button-group">
                                <button className="success-button" onClick={() => ajouterAvis(activity.id)}>Envoyer</button>
                                <button className="gray-button" onClick={() => setShowAvis(null)}>Fermer</button>
                            </div>
                            <div className="avis-liste">
                                <h4>Avis existants :</h4>
                                {(avisParActivite[activity.id] || []).length === 0
                                    ? <p>Aucun avis pour cette activité.</p>
                                    : avisParActivite[activity.id].map((avis, index) => (
                                        <div key={index} className="avis-item">
                                            <div>{"★".repeat(avis.note) + "☆".repeat(5 - avis.note)}</div>
                                            <p>{avis.commentaire}</p>
                                        </div>
                                    ))}
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
