"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression } from "leaflet";

type Point = {
    X: number;
    Y: number;
    number?: string;
};

type MyMapComponentProps = {
    markers: Point[];
};

function MyComponent() {
    const map = useMap();
    console.log('map center:', map.getCenter());
    return null;
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ markers }) => {
    const center: LatLngExpression = [52.23, 21];

    return (
        <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((point, index) => (
                <Marker key={index} position={[point.X, point.Y]}>
                    {point.number && <Popup>{point.number}</Popup>}
                </Marker>
            ))}
            <MyComponent />
        </MapContainer>
    );
};

export default MyMapComponent;