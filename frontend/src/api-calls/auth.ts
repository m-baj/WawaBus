import axios from "axios";
import { RegisterData } from "@/types";

type Response = {
  message: string;
  status: boolean;
};

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export const signup = async (user: RegisterData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      message: response.data,
      status: true,
    };
  } catch (error: any) {
    return {
      message: error.response.data.detail,
      status: false,
    };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      null,
      {
        params: {
          email: data.email,
          password: data.password,
        },
        headers: {
          "accept": "application/json",
        },
      }
    );
    return {
      message: "Login successful",
      token: response.data.access_token,
      status: true,
    };
  } catch (error: any) {
    return {
      message: error.response.data.detail,
      status: false,
    };
  }
};