import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapDisplay = () => {
    const [gisData, setGisData] = useState(null);

    useEffect(() => {
        const fetchGisData = async () => {
            try {
                const response = await fetch('/api/gis');
                const data = await response.json();
                setGisData(data);
            } catch (error) {
                console.error('Error fetching GIS data:', error);
            }
        };

        fetchGisData();
    }, []);

    const position = [40.7128, -74.0060]; // Default New York

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {gisData && gisData.features.map((feature) => (
                    <Marker
                        key={feature.properties.id}
                        position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                    >
                        <Popup>
                            <b>{feature.properties.type}</b><br />
                            Severity: {feature.properties.severity}<br />
                            {feature.properties.description}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapDisplay;
