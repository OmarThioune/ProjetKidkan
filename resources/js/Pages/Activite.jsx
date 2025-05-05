import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Activite.css";

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];
const categories = ["TEST", "Sport", "Technologie"];
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
        axios.get("/api/instance_activities")
            .then((response) => {
                console.log("Données reçues :", response.data);
                setActivities(response.data.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des activités:", error);
            });
    }, []);

    useEffect(() => {
        console.log("expandedActivity actuel :", expandedActivity);
    }, [expandedActivity]);

    const toggleDetails = (id) => {
        console.log("Activité cliquée :", id);
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

    const filteredActivities = activities.filter((instanceActivity) => {
        return (
            (filtreCategorie === "" || instanceActivity.sub_activity.activity.sub_category.category.name === filtreCategorie) &&
            (filtreNiveau === "" || instanceActivity.level === filtreNiveau) &&
            (filtreAge === "" || parseInt(instanceActivity.requiredAge) === parseInt(filtreAge)) &&
            (filtreDebut === "" || instanceActivity.startDate === filtreDebut) &&
            (filtreFin === "" || instanceActivity.endDate === filtreFin)
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

            {filteredActivities.map((instanceActivity) => {
                console.log("ID activité :", instanceActivity.id);
                return (
                    <div key={instanceActivity.id} className="activity-card">
                        <h3>{instanceActivity.sub_activity.activity.sub_category.category.name}</h3>
                        <p><strong>Date début:</strong> {instanceActivity.start} | <strong>Date fin:</strong> {instanceActivity.end}</p>
                        <p><strong>Places restantes:</strong> {instanceActivity.places - instanceActivity.nb_inscription }</p>
                        <button className="primary-button" onClick={() => toggleDetails(instanceActivity.id)}>Consulter</button>

                        {expandedActivity === instanceActivity.id && (
                            <>
                                {console.log("Affichage des détails pour :", instanceActivity.id)}
                                <div className="activity-details">
                                    <p><strong>Description:</strong> {instanceActivity.sub_activity.description}</p>
                                    <p><strong>Matériel requis:</strong> {instanceActivity.sub_activity.material}</p>
                                    <p><strong>Niveau:</strong> {instanceActivity.sub_activity.level}</p>
                                    <div className="map-container">
                                        <iframe
                                            title="Google Map"
                                            width="100%"
                                            height="200"
                                            style={{ border: "0" }}
                                            allowFullScreen
                                            loading="lazy"
                                        ></iframe>
                                        <p>{instanceActivity.address.address_description}</p>
                                    </div>
                                    <p><strong>Âge requis:</strong></p>
                                    {instanceActivity.kid && (
                                        <>
                                            <p><strong>Choisissez un enfant:</strong></p>
                                            <select className="child-select">
                                                {instanceActivity.kid.map((child) => (
                                                    <option key={child.id} value={child.id}>
                                                        {child.name} ({child.age} ans)
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}
                                    <div className="button-group">
                                        <button className="success-button">S'inscrire</button>
                                        <button className="danger-button" onClick={() => toggleDetails(instanceActivity.id)}>Fermer</button>
                                        <button className="warning-button" onClick={() => setShowAvis(instanceActivity.id)}>Avis</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {showAvis === instanceActivity.id && (
                            <div className="avis-section">
                                <h3>Laisser un avis pour l'activité : {instanceActivity.sub_activity.name}</h3>
                                <Etoiles note={note} setNote={setNote} />
                                <textarea
                                    value={commentaire}
                                    onChange={(e) => setCommentaire(e.target.value)}
                                    placeholder="Écrivez votre commentaire ici..."
                                    rows="4"
                                    className="commentaire-textarea"
                                />
                                <div className="button-group">
                                    <button className="success-button" onClick={() => ajouterAvis(instanceActivity.id)}>Envoyer</button>
                                    <button className="gray-button" onClick={() => setShowAvis(null)}>Fermer</button>
                                </div>
                                <div className="avis-liste">
                                    <h4>Avis existants :</h4>
                                    {(avisParActivite[instanceActivity.id] || []).length === 0
                                        ? <p>Aucun avis pour cette activité.</p>
                                        : avisParActivite[instanceActivity.id].map((avis, index) => (
                                            <div key={index} className="avis-item">
                                                <div>{"★".repeat(avis.note) + "☆".repeat(5 - avis.note)}</div>
                                                <p>{avis.commentaire}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {filteredActivities.length === 0 && <p>Aucune activité ne correspond aux filtres.</p>}
        </div>
    );
};

export default Activite;
