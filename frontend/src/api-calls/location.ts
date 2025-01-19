import axios from "axios";
import { LocationRequest, LocationResponse } from "@/types";

export const fetchLocations = async (): Promise<LocationResponse> => {
  try {
    const currentTime = new Date().toISOString();
    // console.log("Current time:", currentTime);

    const payload: LocationRequest = {
      time: currentTime,
    };

    const response = await axios.post<LocationResponse>(
      `http://localhost:8000/api/v1/location/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching locations:", error);

    throw error;
  }
};