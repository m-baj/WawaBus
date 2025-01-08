import axios from "axios";
import { NotificationFormData } from "@/types";

type Response = {
  message: string;
  status: boolean;
};

export const createNotification = async (data: NotificationFormData): Promise<Response> => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/notifications/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data);
    return {
      message: response.data,
      status: true,
    };
  } catch (error: any) {
    console.error("API Error:", error.response.data);
    return {
      message: error.response.data.detail,
      status: false,
    };
  }
};