"use client";
import React from "react";
import dynamic from "next/dynamic";

const MyMapComponent = dynamic(() => import("@/components/mapContainer"), {
    ssr: false,
});

const points = [
    { lat: 50.5, lng: 30.5, label: "Point 1" },
    { lat: 50.6, lng: 30.6, label: "Point 2" },
    { lat: 50.7, lng: 30.7, label: "Point 3" },
];

const Map = () => {
    return (
        <div>
            <MyMapComponent points={points} />
        </div>
    );
};

export default Map;