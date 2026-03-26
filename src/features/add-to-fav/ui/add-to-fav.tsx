import { supabase } from "@/shared/api/supabase";

export const addFavorite = async (tripId: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("favorites")
    .insert({ trip_id: tripId, user_id: user.id });

  if (error) throw new Error(error.message);
};

export const removeFavorite = async (tripId: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("trip_id", tripId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
};

export const getFavorites = async (): Promise<number[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("favorites")
    .select("trip_id")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  return data.map((f) => f.trip_id);
};
