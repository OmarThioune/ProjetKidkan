import React, { useState } from "react";

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

    const [activites, setActivites] = useState([
        {
            nomActivite: "Soccer",
            categorie: "Sport",
            sousCategorie: "Football",
            description: "Un sport d'équipe populaire.",
            materielRequis: "Ballon, Chaussures",
            niveau: "intermediaire",
            ageMin: 10,
            ageMax: 50,
            rue: "Rue des Sports",
            ville: "Paris",
            adresse: "123 Rue des Sports, Paris",
            dateDebut: "2023-01-01",
            dateFin: "2023-12-31",
        },
        {
            nomActivite: "Basket",
            categorie: "Sport",
            sousCategorie: "Basketball",
            description: "Un sport d'équipe avec un ballon.",
            materielRequis: "Ballon, Panier",
            niveau: "avancé",
            ageMin: 12,
            ageMax: 40,
            rue: "Rue des Panier",
            ville: "Lyon",
            adresse: "456 Rue des Panier, Lyon",
            dateDebut: "2023-02-01",
            dateFin: "2023-11-30",
        },
        {
            nomActivite: "Tennis",
            categorie: "Sport",
            sousCategorie: "Tennis",
            description: "Un sport de raquette.",
            materielRequis: "Raquette, Balles",
            niveau: "competitif",
            ageMin: 15,
            ageMax: 60,
            rue: "Rue des Raquettes",
            ville: "Marseille",
            adresse: "789 Rue des Raquettes, Marseille",
            dateDebut: "2023-03-01",
            dateFin: "2023-10-31",
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        setActivites([...activites, formData]);
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

    const handleView = (activite) => {
        alert(JSON.stringify(activite, null, 2));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Ajouter une Activité</h1>
            <form style={{ display: "inline-block", textAlign: "left", maxWidth: "400px", width: "100%" }}>
                <input
                    type="text"
                    name="nomActivite"
                    placeholder="Nom de l'activité"
                    value={formData.nomActivite}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="categorie"
                    placeholder="Catégorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="sousCategorie"
                    placeholder="Sous-catégorie"
                    value={formData.sousCategorie}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="materielRequis"
                    placeholder="Matériel requis"
                    value={formData.materielRequis}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                >
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                    <option value="competitif">Compétitif</option>
                </select>
                <input
                    type="number"
                    name="ageMin"
                    placeholder="Âge minimum"
                    value={formData.ageMin}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="number"
                    name="ageMax"
                    placeholder="Âge maximum"
                    value={formData.ageMax}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="rue"
                    placeholder="Rue"
                    value={formData.rue}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="ville"
                    placeholder="Ville"
                    value={formData.ville}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="date"
                    name="dateDebut"
                    placeholder="Date de début"
                    value={formData.dateDebut}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="date"
                    name="dateFin"
                    placeholder="Date de fin"
                    value={formData.dateFin}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    style={{
                        width: "48%",
                        marginRight: "4%",
                        padding: "10px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Ajouter
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    style={{
                        width: "48%",
                        padding: "10px",
                        backgroundColor: "gray",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Réinitialiser
                </button>
            </form>
            <h2>Liste des Activités</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {activites.map((activite, index) => (
                    <li
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            margin: "10px auto",
                            maxWidth: "400px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span>{activite.nomActivite}</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={() => {
                                    const updatedActivite = prompt("Modifier l'activité (JSON format):", JSON.stringify(activite, null, 2));
                                    if (updatedActivite) {
                                        const parsedActivite = JSON.parse(updatedActivite);
                                        setActivites(activites.map((a, i) => (i === index ? parsedActivite : a)));
                                    }
                                }}
                                style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleView(activite)}
                                style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                View
                            </button>
                            <button
                                onClick={() => setActivites(activites.filter((_, i) => i !== index))}
                                style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ajouter;