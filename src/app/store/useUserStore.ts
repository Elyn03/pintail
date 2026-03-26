import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

// Selectors
export const useUserId = () => useAuthStore((state) => state.user?.id);
export const useUser = () => useAuthStore((state) => state.user);
export const useSession = () => useAuthStore((state) => state.session);
export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading);

type AuthState = {
  user: User | null;
  session: Session | null;
  username: string | null;
  isLoading: boolean;

  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  username: null,
  isLoading: true,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      username: session?.user?.user_metadata?.username ?? null,
      isLoading: false,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
