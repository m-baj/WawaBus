import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import BusMarker from "@/components/busMarker";
import { BusData, LocationResponse } from "@/types";
import { fetchLocations } from "@/api-calls/location";

import "leaflet/dist/leaflet.css";
import { line } from "framer-motion/client";
import { timeStamp } from "console";

interface MapProps {
  selectedLines: string[];
  lineNumbers: string[];
  setLineNumbers: React.Dispatch<React.SetStateAction<string[]>>;
  timestamp: string;
}

export default function Map(props: MapProps) {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkersFromStorage = () => {
      const savedMarkers = localStorage.getItem("busMarkers");
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
        console.log("Fetching bus data, timestamp:", props.timestamp);
        const data: LocationResponse = await fetchLocations(props.timestamp);
        console.log("Fetched bus data:", data);

        if (data && Array.isArray(data.result)) {
          setBusData(data.result);
          props.setLineNumbers(
            Array.from(new Set(data.result.map((bus) => bus.Lines.toString())))
          );
          console.log(props.lineNumbers);
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
  }, [window.location.pathname, props.timestamp]);

  useEffect(() => {
    console.log("Filtered lines:", props.selectedLines);
    if (props.selectedLines.length > 0) {
      setFilteredBuses(
        busData.filter((bus) =>
          props.selectedLines.includes(bus.Lines.toString())
        )
      );
    } else {
      setFilteredBuses(busData);
    }
  }, [props.selectedLines, busData]);

  if (loading && busData.length === 0) {
    // Pokazuj loading tylko jeśli brak markerów
    return <div>Loading bus data...</div>;
  }

  if (error && busData.length === 0) {
    // Pokazuj błąd tylko jeśli brak markerów
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
      {filteredBuses.map((bus) => (
        <BusMarker key={bus.VehicleNumber} bus={bus} />
      ))}
    </MapContainer>
  );
}
