import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Remplacez cette URL par l'API ou les données réelles de vos instance_activity
        fetch("/api/instance_activity")
            .then((response) => response.json())
            .then((data) => setActivities(data))
            .catch((error) => console.error("Erreur lors du chargement des données :", error));
    }, []);

    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {activities.map((activity, index) => (
                <Marker key={index} position={[activity.latitude, activity.longitude]}>
                    <Popup>{activity.address}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;