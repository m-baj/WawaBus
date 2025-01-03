import React from "react";
import { BusPosition } from "@/types";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface BusMarkerProps {
  position: BusPosition;
  busNumber: number;
}

const createCustomIcon = (busNumber: string) => {
  return L.divIcon({
    className: "custom-bus-icon",
    html: `
        <div style="
          position: relative; 
          display: inline-block;
        ">
          <img 
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" 
            style="width: 25px; height: 41px;" 
          />
          <div style="
            position: absolute;
            top: 5px;
            left: 50%; 
            transform: translateX(-50%);
            background: white; 
            border: 1px solid black; 
            border-radius: 4px; 
            padding: 2px 4px; 
            font-size: 12px; 
            font-weight: bold;
            pointer-events: none; 
          ">
            ${busNumber}
          </div>
        </div>
      `,
    iconSize: [35, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const BusMarker = (props: BusMarkerProps) => {
  const customIcon = createCustomIcon(props.busNumber.toString());
  return (
    <Marker icon={customIcon} position={[props.position.X, props.position.Y]}>
      <Popup>{props.busNumber}</Popup>
    </Marker>
  );
};

export default BusMarker;
