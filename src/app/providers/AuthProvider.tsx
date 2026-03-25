import { useEffect } from "react";
import { supabase } from "@/shared/api/supabase";
import { useAuthStore } from "@/app/store/useUserStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    // session initiale
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // écoute des changements
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [setSession]);

  return <>{children}</>;
};
