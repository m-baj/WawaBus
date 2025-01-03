"use client";
import React from "react";
import dynamic from "next/dynamic";

const MyMapComponent = dynamic(() => import("@/components/mapContainer"), {
    ssr: false,
});

const markers_example = [
    { X: 52.2, Y: 21.0, number: "123" },
    { X: 52.22, Y: 21.1, number: "124" },
    { X: 52.18, Y: 21.05, number: "125" },
];

const Map = () => {
    return (
        <div>
            <MyMapComponent markers={markers_example} />
        </div>
    );
};

export default Map;