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
        prix: "",
        rue: "",
        numeroCivique: "",
        ville: "",
        province: "",
        codePostal: "",
        pays: "",
        adresseDescription: "",
        dateDebut: "",
        dateFin: "",
    });

    const [activites, setActivites] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validerChamps = () => {
        const champsRequis = [
            "nomActivite", "categorie", "sousCategorie", "description",
            "prix", "rue", "numeroCivique", "ville", "province", "codePostal",
            "pays", "adresseDescription", "dateDebut", "dateFin"
        ];

        for (let champ of champsRequis) {
            if (!formData[champ] || formData[champ].trim() === "") {
                alert(`Le champ "${champ}" est obligatoire.`);
                return false;
            }
        }

        if (isNaN(parseFloat(formData.prix))) {
            alert("Le prix doit être un nombre décimal valide.");
            return false;
        }

        if (formData.ageMin && formData.ageMax && parseInt(formData.ageMin) > parseInt(formData.ageMax)) {
            alert("L'âge minimum ne peut pas être supérieur à l'âge maximum.");
            return false;
        }

        return true;
    };

    const handleAdd = async () => {
        if (!validerChamps()) return;

        try {
            // 1. Ajouter la catégorie
            const categorieRes = await axios.post("/api/categories", {
                name: formData.categorie
            });
            const categorieId = categorieRes.data.id;

            // 2. Ajouter la sous-catégorie
            const sousCategorieRes = await axios.post("/api/sub_category", {
                name: formData.sousCategorie,
                description: formData.description,
                category_id: categorieId
            });
            const sousCategorieId = sousCategorieRes.data.id;

            // 3. Ajouter l'activité
            const activiteRes = await axios.post("/api/activities", {
                name: formData.nomActivite,
                description: formData.description,
                provider_id: 1, // À adapter selon le contexte
                sub_category_id: sousCategorieId
            });
            const activiteId = activiteRes.data.id;

            // 4. Ajouter la sous-activité
            const sousActiviteRes = await axios.post("/api/sub_activities", {
                name: formData.sousCategorie,
                min_Age: formData.ageMin || null,
                max_Age: formData.ageMax || null,
                description: formData.description,
                material: formData.materielRequis,
                level: formData.niveau,
                activity_id: activiteId
            });
            const sousActiviteId = sousActiviteRes.data.id;

            // 5. Ajouter l'adresse
            const adresseRes = await axios.post("/api/addresses", {
                civil_number: formData.numeroCivique,
                street_name: formData.rue,
                postal_code: formData.codePostal,
                city: formData.ville,
                province: formData.province,
                country: formData.pays,
                address_description: formData.adresseDescription
            });
            const adresseId = adresseRes.data.id;

            // 6. Ajouter l'instance d'activité
            const instanceRes = await axios.post("/api/instance_activities", {
                start: formData.dateDebut,
                end: formData.dateFin,
                deadline: formData.dateFin, // peut être changé
                places: 30,
                nb_inscription: 0,
                debutHour: "08:00:00",
                endHour: "16:00:00",
                status: "À venir",
                minutes: 60,
                debutSubscription: formData.dateDebut,
                location: "À préciser",
                cancelation: false,
                address_id: adresseId,
                sub_activity_id: sousActiviteId
            });
            const instanceId = instanceRes.data.id;

            // 7. Ajouter le prix
            await axios.post("/api/pricing", {
                price: formData.prix,
                type: "frais total",
                instance_activity_id: instanceId
            });

            // 8. Ajouter dans le state local
            setActivites((prev) => [...prev, { id: instanceId, nomActivite: formData.nomActivite }]);
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
            prix: "",
            rue: "",
            numeroCivique: "",
            ville: "",
            province: "",
            codePostal: "",
            pays: "",
            adresseDescription: "",
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
                    "nomActivite", "categorie", "sousCategorie", "materielRequis", "ageMin",
                    "ageMax", "prix", "rue", "numeroCivique", "ville", "province", "codePostal",
                    "pays", "adresseDescription", "dateDebut", "dateFin"
                ].map((field) => (
                    <input
                        key={field}
                        type={field.includes("age") || field === "prix" || field === "numeroCivique" ? "number" : field.includes("date") ? "date" : "text"}
                        step={field === "prix" ? "0.01" : undefined}
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
                    <button type="button" onClick={handleAdd} className="ajouter-btn blue">Ajouter</button>
                    <button type="button" onClick={handleReset} className="ajouter-btn gray">Réinitialiser</button>
                </div>
            </form>

            <h2>Liste des Activités</h2>
            <ul className="ajouter-list">
                {activites.map((activite, index) => (
                    <li key={index} className="ajouter-list-item">
                        <span>{activite.nomActivite || `Activité #${activite.id}`}</span>
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
