import React, { useState , useEffect } from "react";
import axios from "axios";
import './AjouterActivite.css';
const AjouterActivite = () => {
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        provider_id: "1",
        sub_category_id: "1",
       
    });

    const [activities, setActivites] = useState([]);
    const [providers, setProviders] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        // Fetch providers and subcategories (if not already available)
        fetchProvidersAndCategories();
    }, []);

    const fetchProvidersAndCategories = async () => {
        try {
            const [providersRes, subCategoriesRes] = await Promise.all([
                axios.get("/api/providers"),
                axios.get("/api/sub_categories"),
            ]);
            setProviders(providersRes.data.data);
            setSubCategories(subCategoriesRes.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };


    useEffect(() => {
        fetchActivites();
    }, []);

    const fetchActivites = async () => {
        try {
            const response = await axios.get("/api/activities");
            setActivites(response.data.data);  // Assumes response.data is an array of activities
        } catch (error) {
            console.error("Erreur de chargement :", error);
            alert("Impossible de charger les activités.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validerChamps = () => {
        const champsRequis = [
            "name", "description", "provider_id", "sub_category_id"
        ];

        for (let champ of champsRequis) {
            if (!formData[champ] || formData[champ].trim() === "") {
                alert(`Le champ "${champ}" est obligatoire.`);
                return false;
            }
        }
        return true;
    };

    const handleAdd = async () => {
        if (!validerChamps()) return;

        try {

            // 3. Ajouter l'activité
            const activiteRes = await axios.post("/api/activities", {
                name: formData.name,
                description: formData.description,
                provider_id: 1, // À adapter selon le contexte
                sub_category_id: 1
            });
            const activiteId = activiteRes.data.id;

            // 8. Ajouter dans le state local
            //setActivites((prev) => [...prev, { id: activiteId, name: formData.name }]);
            fetchActivites();
            handleReset();
            alert("Activité ajoutée avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Erreur lors de l'ajout de l'activité.");
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            description: "",
            provider_id: "1",
            sub_category_id: "1",
        });
    };

    const handleView = async (id) => {
        try {
            const response = await axios.get(`/api/activities/${id}`);
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
                <select name="provider_id" value={formData.provider_id} onChange={handleChange} className="ajouter-input">
                    {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </select>

                <select name="sub_category_id" value={formData.sub_category_id} onChange={handleChange} className="ajouter-input">
                    {subCategories.map(subCategory => (
                        <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom de l'activité"
                    value={formData.name}
                    onChange={handleChange}
                    className="ajouter-input"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="ajouter-input"
                />

                <div className="ajouter-buttons">
                    <button type="button" onClick={handleAdd} className="ajouter-btn blue">Ajouter</button>
                    <button type="button" onClick={handleReset} className="ajouter-btn gray">Réinitialiser</button>
                </div>
            </form>

            <h2>Liste des Activités</h2>
            <ul className="ajouter-list">
                {activities.map((activite, index) => (
                    <li key={index} className="ajouter-list-item">
                        <span>{activite.name || `Activité #${activite.id}`}</span>
                        <div className="ajouter-list-actions">
                            <button onClick={() => handleView(activite.id)} className="ajouter-btn blue">Voir</button>
                            <button onClick={() => setActivites(activities.filter((_, i) => i !== index))} className="ajouter-btn red">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default AjouterActivite;
