import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BusMarker from "@/components/busMarker";
import { BusData } from "@/types";
import { fetchLocations } from "@/api-calls/location";

import "leaflet/dist/leaflet.css";

export default function Map() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchLocations();
        console.log("Fetched bus data:", data);

        if (data && Array.isArray(data.result)) {
          setBusData(data.result);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (error: any) {
        console.error("Error fetching bus data:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch bus data on initial load
    fetchBusData();

    // Polling every 60 seconds
    const interval = setInterval(fetchBusData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading bus data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MapContainer
      center={[52.231074, 21.010103]}
      zoom={16}
      style={{ height: "100%", width: "100%", border: "1px solid #949494" }}
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