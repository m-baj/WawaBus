import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import BusMarker from "@/components/busMarker";
import { generateBusData } from "@/utils";

import "leaflet/dist/leaflet.css";

const busData = generateBusData(1000);
export default function Map() {
  return (
    <MapContainer
      center={[52.231074, 21.010103]}
      zoom={16}
      style={{ height: "100%", width: "100%", border: "1px solid #949494" }}
    >
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {busData.map((bus) => (
        <BusMarker
          key={bus.busNumber}
          position={bus.position}
          busNumber={bus.busNumber}
        />
      ))}
    </MapContainer>
  );
}
