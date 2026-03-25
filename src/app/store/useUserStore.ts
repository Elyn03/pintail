import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  session: Session | null;
  username: string | null;

  setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  username: null,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      username: session?.user?.user_metadata?.username ?? null,
    }),
}));
