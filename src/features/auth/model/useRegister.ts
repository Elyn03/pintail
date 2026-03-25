import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import { useAuthStore } from "@/app/store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => register(email, password, username),

    onSuccess: (data) => {
      setSession(data.session);
      navigate("/");
    },

    onError: (error) => {
      console.error("Erreur d'inscription:", error.message);
    },
  });
};
