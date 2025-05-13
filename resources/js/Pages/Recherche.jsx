import React, { useState, useEffect } from "react";
import axios from "axios";

const Recherche = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [children, setChildren] = useState([]);
    const [childName, setChildName] = useState("");
    const [childAge, setChildAge] = useState("");

    // Charger les enfants au montage
    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await axios.get("/api/kids");
            setChildren(response.data.data);
        } catch (error) {
            console.error("Erreur lors du chargement des enfants :", error);
        }
    };

    const handleAddChild = async () => {
        if (childName && childAge) {
            try {
                const response = await axios.post("/api/kids", {
                    name: childName,
                    age: childAge
                });
                setChildren([...children, response.data]);
                setChildName("");
                setChildAge("");
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'enfant :", error);
            }
        }
    };

    const handleCancelActivity = async (subscriptionId) => {
        try {
            await axios.delete(`/api/subscription_kids/${subscriptionId}`);
            fetchChildren(); // recharge les données après suppression
        } catch (error) {
            console.error("Erreur lors de l'annulation de l'activité :", error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Modifier les informations</h1>

            <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Numéro de téléphone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <div style={{ textAlign: "center" }}>
                    <button style={buttonStyle}>Modifier</button>
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                    Nom de l'enfant:
                    <input
                        type="text"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Âge:
                    <input
                        type="number"
                        value={childAge}
                        onChange={(e) => setChildAge(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <div style={{ textAlign: "center" }}>
                    <button onClick={handleAddChild} style={buttonStyle}>Ajouter</button>
                </div>
            </div>

            <h2 style={{ color: "#444" }}>Liste des enfants</h2>
            {children.map((child, index) => (
                <div key={child.id || index} style={childCardStyle}>
                    <details>
                        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                            {child.name} - {child.age} ans
                        </summary>
                        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                        {child.subscription_kids?.length > 0 ? (
                            child.subscription_kids.map((sub) => (
                                <li key={sub.id} style={{ marginBottom: "5px" }}>
                                    Activité ID: {sub.instance_activity_id}
                                    <button
                                        onClick={() => handleCancelActivity(sub.id)}
                                        style={cancelButtonStyle}
                                    >
                                        Annuler
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>Aucune activité inscrite</li>
                        )}

                        </ul>
                    </details>
                </div>
            ))}
        </div>
    );
};

const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const labelStyle = {
    display: "block",
    marginBottom: "10px",
    color: "#555",
};

const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
};

const buttonStyle = {
    marginTop: "15px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const cancelButtonStyle = {
    marginLeft: "10px",
    color: "#dc3545",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
};

const childCardStyle = {
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "10px 15px",
    boxShadow: "0 0 5px rgba(0,0,0,0.05)"
};

export default Recherche;
