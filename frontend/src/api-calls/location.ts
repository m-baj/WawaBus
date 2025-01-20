import axios from "axios";
import { LocationRequest, LocationResponse } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const fetchLocations = async (
  timestamp?: string
): Promise<LocationResponse> => {
  try {
    const currentTime = timestamp || new Date().toISOString();
    console.log("Current time:", currentTime);

    const payload: LocationRequest = {
      time: currentTime,
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
