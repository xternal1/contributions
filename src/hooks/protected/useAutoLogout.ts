import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
}
