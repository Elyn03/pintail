import { supabase } from "@/shared/api/supabase";

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data; // contient session
};

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) throw error;

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
