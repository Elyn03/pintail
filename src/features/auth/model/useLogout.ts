import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth.api";
import { useAuthStore } from "@/app/store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      setSession(null);
      navigate("/login");
    },

    onError: (error) => {
      console.error("Erreur de déconnexion:", error.message);
    },
  });
};
