import React, { useState } from "react";

const activities = [
    {
        id: 1,
        name: "Football",
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
        name: "Danse",
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
    // Ajoutez 3 autres exemples ici
];

const Activite = () => {
    const [expandedActivity, setExpandedActivity] = useState(null);

    const toggleDetails = (id) => {
        setExpandedActivity(expandedActivity === id ? null : id);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            {activities.map((activity) => (
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
                    <p>
                        <strong>Date début:</strong> {activity.startDate} | <strong>Date fin:</strong> {activity.endDate}
                    </p>
                    <p>
                        <strong>Places restantes:</strong> {activity.remainingPlaces}
                    </p>
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
                            <p>
                                <strong>Description:</strong> {activity.description}
                            </p>
                            <p>
                                <strong>Fournisseur:</strong> {activity.provider}
                            </p>
                            <p>
                                <strong>Matériel requis:</strong> {activity.requiredEquipment}
                            </p>
                            <p>
                                <strong>Niveau:</strong> {activity.level}
                            </p>
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
                            <p>
                                <strong>Âge requis:</strong> {activity.requiredAge}
                            </p>
                            <p>
                                <strong>Choisissez un enfant:</strong>
                            </p>
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
                                    }}
                                    onClick={() => toggleDetails(activity.id)}
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Activite;