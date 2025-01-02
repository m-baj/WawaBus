"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

type Point = {
    lat: number;
    lng: number;
    label?: string;
};

type MyMapComponentProps = {
    points: Point[];
};

function MyComponent() {
    const map = useMap();
    console.log('map center:', map.getCenter());
    return null;
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ points }) => {
    return (
        <MapContainer center={[50.5, 30.5]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    {point.label && <Popup>{point.label}</Popup>}
                </Marker>
            ))}
            <MyComponent />
        </MapContainer>
    );
};

export default MyMapComponent;