import React, { useState } from "react";

const Recherche = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [children, setChildren] = useState([
        {
            name: "Alice",
            age: 8,
            activities: ["Danse", "Natation", "Peinture", "Piano"],
        },
        {
            name: "Bob",
            age: 10,
            activities: ["Football", "Échecs", "Guitare", "Mathématiques"],
        },
        {
            name: "Charlie",
            age: 7,
            activities: ["Lecture", "Théâtre", "Tennis", "Cuisine"],
        },
        {
            name: "Diana",
            age: 9,
            activities: ["Basketball", "Yoga", "Chant", "Informatique"],
        },
    ]);
    const [childName, setChildName] = useState("");
    const [childAge, setChildAge] = useState("");

    const handleAddChild = () => {
        if (childName && childAge) {
            setChildren([
                ...children,
                { name: childName, age: childAge, activities: [] },
            ]);
            setChildName("");
            setChildAge("");
        }
    };

    const handleCancelActivity = (childIndex, activityIndex) => {
        const updatedChildren = [...children];
        updatedChildren[childIndex].activities.splice(activityIndex, 1);
        setChildren(updatedChildren);
    };

    return (
        <div style={{
            maxWidth: "800px",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
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
                <div key={index} style={{
                    marginBottom: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "10px 15px",
                    boxShadow: "0 0 5px rgba(0,0,0,0.05)"
                }}>
                    <details>
                        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                            {child.name} - {child.age} ans
                        </summary>
                        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                            {child.activities.length > 0 ? (
                                child.activities.map((activity, activityIndex) => (
                                    <li key={activityIndex} style={{ marginBottom: "5px" }}>
                                        {activity}{" "}
                                        <button
                                            onClick={() =>
                                                handleCancelActivity(index, activityIndex)
                                            }
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

export default Recherche;
