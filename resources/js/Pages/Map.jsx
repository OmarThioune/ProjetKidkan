// Map.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Map = () => {
    const [activities, setActivities] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        axios.get("/api/instance_activities")
            .then((response) => {
                setActivities(response.data.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des activités:", error);
            });
    }, []);

    const formatAddress = (addr) => {
        if (!addr) return "";
        return `${addr.civil_number}, ${addr.street_name}, ${addr.city}, ${addr.province}, ${addr.postal_code}, ${addr.country}`;
    };

    const allAddresses = activities
        .map((a) => formatAddress(a.address))
        .filter((addr) => addr.trim() !== "");

    const mapSrc = selectedAddress
        ? `https://www.google.com/maps?q=${encodeURIComponent(selectedAddress)}&output=embed`
        : allAddresses.length
            ? `https://www.google.com/maps?q=${encodeURIComponent(allAddresses.join(" | "))}&output=embed`
            : "";

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Carte des activités</h2>

            {mapSrc ? (
                <div className="w-full h-[500px] mb-8 border-2 border-gray-200 rounded-md overflow-hidden shadow">
                    <iframe
                        title="Google Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={mapSrc}
                    ></iframe>
                </div>
            ) : (
                <p className="text-center text-gray-500">Aucune adresse disponible pour l’instant.</p>
            )}

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allAddresses.map((address, index) => (
                    <li
                        key={index}
                        className="bg-gray-100 p-4 rounded shadow hover:bg-blue-50 transition"
                    >
                        <p className="mb-2 text-gray-800">{address}</p>
                        <button
                            onClick={() => setSelectedAddress(address)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Voir sur la carte
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Map;
