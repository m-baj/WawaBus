import axios from "axios";
import { NotificationFormData } from "@/types";

type Response = {
  message: string;
  status: boolean;
};

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const createNotification = async (data: NotificationFormData): Promise<Response> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notifications/`,
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

type Notification = {
  id: string;
  line: string;
  stop: string;
  email: string;
  time: string;
  user_id: number;
};

export const fetchNotifications = async (user_id: number): Promise<Notification[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/notifications/user/${user_id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response.data);
    return [];
  }
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/notifications/${id}`);
    return true;
  } catch (error: any) {
    console.error("API Error:", error.response.data);
    return false;
  }
};