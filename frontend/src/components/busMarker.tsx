import React from "react";
import { BusData } from "@/types";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface BusMarkerProps {
  bus: BusData;
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

const BusMarker: React.FC<BusMarkerProps> = ({ bus }) => {
  const customIcon = createCustomIcon(bus.Lines);

  return (
    <Marker icon={customIcon} position={[bus.Lat, bus.Lon]}>
      <Popup>
        <div>
          <strong>Bus Number:</strong> {bus.VehicleNumber}
          <br />
          <strong>Lines:</strong> {bus.Lines}
          <br />
          <strong>Brigade:</strong> {bus.Brigade}
          <br />
          <strong>Last Updated:</strong> {new Date(bus.Time).toLocaleString()}
        </div>
      </Popup>
    </Marker>
  );
};

export default BusMarker;
