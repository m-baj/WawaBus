import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  id: number;
  exp: number;
}

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const useAuth = () => {
  let user = null;

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        user = {
          email: decoded.email,
          id: decoded.id,
        };
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    redirect("/auth/login");
  };

  return { user, handleLogout };
};

export default useAuth;
export { isLoggedIn };