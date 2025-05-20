import React, { useState, useEffect } from "react";
import {  Link } from '@inertiajs/react';
import axios from "axios";
import "./Activite.css";
import { usePage } from '@inertiajs/react';

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];
const categories = ["TEST", "Sport", "Technologie"];

const Activite = () => {
    const [activities, setActivities] = useState([]);
    const [expandedActivity, setExpandedActivity] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [filtreNiveau, setFiltreNiveau] = useState("");
    const [filtreAgeMin, setFiltreAgeMin] = useState("");
    const [filtreAgeMax, setFiltreAgeMax] = useState("");
    const [filtreDateDebut, setFiltreDateDebut] = useState("");
    const [filtreDateFin, setFiltreDateFin] = useState("");
    const [showAvis, setShowAvis] = useState(null);
    const [commentaire, setCommentaire] = useState("");
    const [note, setNote] = useState(0);
    const [avisParActivite, setAvisParActivite] = useState({});
    const [Kids, setKids] = useState([]);
    const [selectedKids, setSelectedKids] = useState({});

    const user = props.user;
    const kids = props.kids;

    useEffect(() => {
        axios.get("/api/instance_activities")
            .then((response) => {
                setActivities(response.data.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des activités:", error);
            });

        axios.get("/api/kids")
            .then((response) => {
                setKids(response.data.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des enfants:", error);
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

    const inscrireEnfant = (idActivite) => {
        const kidId = selectedKids[idActivite];
        if (!kidId) {
            alert("Veuillez sélectionner un enfant avant de vous inscrire.");
            return;
        }

        const payload = {
            favorite: "Test",
            status: "En cours",
            kid_id: kidId,
            instance_activity_id: idActivite
        };

        axios.post("/api/subscription_kids", payload)
            .then((response) => {
                alert("Inscription réussie !");
            })
            .catch((error) => {
                console.error("Erreur lors de l'inscription :", error);
                alert("Échec de l'inscription.");
            });
    };

    const Etoiles = ({ note, setNote }) => (
        <div className="etoiles">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} onClick={() => setNote(n)} className={n <= note ? "etoile-active" : "etoile"}>★</span>
            ))}
        </div>
    );

    const filteredActivities = activities.filter((instanceActivity) => {
        const minAge = instanceActivity.sub_activity.min_Age; // Âge minimum de l'activité
        const maxAge = instanceActivity.sub_activity.max_Age; // Âge maximum de l'activité
        const startDate = instanceActivity.start;
        const endDate = instanceActivity.end;
    
        // Vérifiez si les filtres d'âge sont valides avant de les comparer
        const isAgeValid =
            (filtreAgeMin === "" || minAge >= parseInt(filtreAgeMin)) && // L'âge minimum de l'activité doit être >= à filtreAgeMin
            (filtreAgeMax === "" || maxAge >= parseInt(filtreAgeMin)); // L'âge maximum de l'activité doit être >= à filtreAgeMin
    
        return (
            (filtreCategorie === "" || instanceActivity.sub_activity.activity.sub_category.category.name === filtreCategorie) &&
            (filtreNiveau === "" || instanceActivity.level === filtreNiveau) &&
            isAgeValid && // Appliquez ici le filtre d'âge
            (filtreDateDebut === "" || startDate >= filtreDateDebut) &&
            (filtreDateFin === "" || endDate <= filtreDateFin)
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

                    <input type="number" placeholder="Âge minimum" value={filtreAgeMin} onChange={(e) => setFiltreAgeMin(e.target.value)} />
                    <input type="number" placeholder="Âge maximum" value={filtreAgeMax} onChange={(e) => setFiltreAgeMax(e.target.value)} />
                    <input type="date" value={filtreDateDebut} onChange={(e) => setFiltreDateDebut(e.target.value)} />
                    <input type="date" value={filtreDateFin} onChange={(e) => setFiltreDateFin(e.target.value)} />
                </div>
            )}

            {filteredActivities.map((instanceActivity) => {
                const fullAddress = `${instanceActivity.address.civil_number}, ${instanceActivity.address.street_name}, ${instanceActivity.address.city}, ${instanceActivity.address.province}, ${instanceActivity.address.postal_code}, ${instanceActivity.address.country}`;

                return (
                    <div key={instanceActivity.id} className="activity-card">
                        <h3>{instanceActivity.sub_activity.activity.sub_category.category.name}</h3>
                        <p><strong>Date début:</strong> {instanceActivity.start.split("T")[0]} | <strong>Date fin:</strong> {instanceActivity.end.split("T")[0]}</p>
                        <p><strong>Places restantes:</strong> {instanceActivity.places - instanceActivity.nb_inscription}</p>
                        <button className="primary-button" onClick={() => toggleDetails(instanceActivity.id)}>Consulter</button>

                        {expandedActivity === instanceActivity.id && (
                            <div className="activity-details">
                                <p><strong>Description:</strong> {instanceActivity.sub_activity.description}</p>
                                <p><strong>Matériel requis:</strong> {instanceActivity.sub_activity.material}</p>
                                <p><strong>Age minimum:</strong> {instanceActivity.sub_activity.min_Age}</p>
                                <p><strong>Age maximum:</strong> {instanceActivity.sub_activity.max_Age}</p>
                                <p><strong>Niveau:</strong> {instanceActivity.sub_activity.level}</p>
                                <p><strong>Prix:</strong> {instanceActivity.pricings[0].price}</p>
                               

                                <div className="map-container">
                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="200"
                                        style={{ border: "0" }}
                                        allowFullScreen
                                        loading="lazy"
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                                    ></iframe>
                                    <p>{instanceActivity.address.address_description}</p>
                                </div>

                                    {user ? (
                                        <>
                                            <p><strong>Choisissez un enfant :</strong></p>
                                            <select
                                                className="child-select"
                                                value={selectedKids[instanceActivity.id] || ""}
                                                onChange={(e) =>
                                                    setSelectedKids((prev) => ({
                                                        ...prev,
                                                        [instanceActivity.id]: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {Kids.map((child) => (
                                                    <option key={child.id} value={child.id}>
                                                        {child.name} ({child.age} ans)
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ) : (
                                        <p className="text-red-600 font-bold">Veuillez vous connecter pour choisir un enfant.</p>
                                    )}
                                <div className="button-group">
                                    <button className="success-button" onClick={() => inscrireEnfant(instanceActivity.id)}>S'inscrire</button>
                                    <button className="danger-button" onClick={() => toggleDetails(instanceActivity.id)}>Fermer</button>
                                    <button className="warning-button" onClick={() => setShowAvis(instanceActivity.id)}>Avis</button>
                                </div>
                            </div>
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