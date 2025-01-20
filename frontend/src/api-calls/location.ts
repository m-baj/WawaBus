import axios from "axios";
import { LocationRequest, LocationResponse } from "@/types";
import { time } from "console";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const fetchLocations = async (
  timestamp: string
): Promise<LocationResponse> => {
  try {
    let date = new Date(timestamp);
    date.setHours(date.getHours() - 1);
    timestamp = date.toISOString();
    if (new Date(timestamp) > new Date()) {
      timestamp = new Date().toISOString();
    }
    console.log("Timestamp:", timestamp);

    const payload: LocationRequest = {
      time: timestamp,
    };

    const response = await axios.post<LocationResponse>(
      `${API_BASE_URL}/location/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    localStorage.setItem("busMarkers", JSON.stringify(response.data.result));

    return response.data;
  } catch (error: any) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
