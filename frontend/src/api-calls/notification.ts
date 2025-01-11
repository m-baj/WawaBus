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
      `http://localhost:8000/api/v1/notifications/user/${user_id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response.data);
    return [];
  }
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`http://localhost:8000/api/v1/notifications/${id}`);
    return true;
  } catch (error: any) {
    console.error("API Error:", error.response.data);
    return false;
  }
};