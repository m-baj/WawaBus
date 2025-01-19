import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BusMarker from "@/components/busMarker";
import { BusData, LocationResponse } from "@/types";
import { fetchLocations } from "@/api-calls/location";

import "leaflet/dist/leaflet.css";

export default function Map() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkersFromStorage = () => {
      const savedMarkers = localStorage.getItem('busMarkers');
      if (savedMarkers) {
        try {
          const parsedMarkers: BusData[] = JSON.parse(savedMarkers);
          setBusData(parsedMarkers);
          console.log("Loaded markers from localStorage:", parsedMarkers);
        } catch (e) {
          console.error("Error parsing markers from localStorage:", e);
        }
      }
    };

    const fetchBusData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: LocationResponse = await fetchLocations();
        console.log("Fetched bus data:", data);

        if (data && Array.isArray(data.result)) {
          setBusData(data.result);
        } else {
          console.error("Unexpected data format:", data);
          throw new Error("Invalid data format received.");
        }
      } catch (error: any) {
        console.error("Error fetching bus data:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadMarkersFromStorage();

    fetchBusData();

    const interval = setInterval(fetchBusData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading && busData.length === 0) { // Pokazuj loading tylko jeśli brak markerów
    return <div>Loading bus data...</div>;
  }

  if (error && busData.length === 0) { // Pokazuj błąd tylko jeśli brak markerów
    return <div>Error: {error}</div>;
  }

  return (
    <MapContainer
      center={[52.231074, 21.010103]}
      zoom={16}
      style={{ height: "100vh", width: "100%", border: "1px solid #949494" }}
    >
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        crossOrigin=""
      />

      {/* TileLayer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render BusMarkers */}
      {busData.map((bus) => (
        <BusMarker key={bus.VehicleNumber} bus={bus} />
      ))}
    </MapContainer>
  );
}
