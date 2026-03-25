import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { useAuthStore } from "@/app/store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: (data) => {
      setSession(data.session);
      navigate("/");
    },

    onError: (error) => {
      console.error("Erreur de connexion:", error.message);
    },
  });
};
