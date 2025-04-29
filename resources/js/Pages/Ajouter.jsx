import React, { useState } from "react";
import axios from "axios";
import './Ajouter.css';


const Ajouter = () => {
    const [formData, setFormData] = useState({
        nomActivite: "",
        categorie: "",
        sousCategorie: "",
        description: "",
        materielRequis: "",
        niveau: "debutant",
        ageMin: "",
        ageMax: "",
        rue: "",
        ville: "",
        adresse: "",
        dateDebut: "",
        dateFin: "",
    });

    const [activites, setActivites] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post("/api/instance_activities", {
                ...formData,
                adresse: {
                    rue: formData.rue,
                    ville: formData.ville,
                    adresse: formData.adresse
                }
            });
            setActivites((prev) => [...prev, response.data]);
            handleReset();
            alert("Activité ajoutée avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Erreur lors de l'ajout de l'activité.");
        }
    };

    const handleReset = () => {
        setFormData({
            nomActivite: "",
            categorie: "",
            sousCategorie: "",
            description: "",
            materielRequis: "",
            niveau: "debutant",
            ageMin: "",
            ageMax: "",
            rue: "",
            ville: "",
            adresse: "",
            dateDebut: "",
            dateFin: "",
        });
    };

    const handleView = async (id) => {
        try {
            const response = await axios.get(`/api/instance_activities/${id}`);
            alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error("Erreur de récupération :", error);
            alert("Impossible de récupérer l'activité.");
        }
    };

    return (
        <div className="ajouter-container">
            <h1>Ajouter une Activité</h1>
            <form className="ajouter-form">
                {[
                    "nomActivite", "categorie", "sousCategorie", "materielRequis",
                    "ageMin", "ageMax", "rue", "ville", "adresse", "dateDebut", "dateFin"
                ].map((field) => (
                    <input
                        key={field}
                        type={field.includes("age") ? "number" : field.includes("date") ? "date" : "text"}
                        name={field}
                        placeholder={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="ajouter-input"
                    />
                ))}

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="ajouter-input"
                />

                <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    className="ajouter-input"
                >
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                    <option value="competitif">Compétitif</option>
                </select>

                <div className="ajouter-buttons">
                    <button type="button" onClick={handleAdd} className="ajouter-btn blue">
                        Ajouter
                    </button>
                    <button type="button" onClick={handleReset} className="ajouter-btn gray">
                        Réinitialiser
                    </button>
                </div>
            </form>

            <h2>Liste des Activités</h2>
            <ul className="ajouter-list">
                {activites.map((activite, index) => (
                    <li key={index} className="ajouter-list-item">
                        <span>{activite.nomActivite}</span>
                        <div className="ajouter-list-actions">
                            <button onClick={() => handleView(activite.id)} className="ajouter-btn blue">Voir</button>
                            <button onClick={() => setActivites(activites.filter((_, i) => i !== index))} className="ajouter-btn red">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ajouter;
