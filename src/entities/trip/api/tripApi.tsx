import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/api/supabase";
import { useAuthStore } from "../../../app/store/useUserStore";
import type { Trip } from "../types";

const fetchTrips = async (userId: string | undefined): Promise<Trip[]> => {
  if (!userId) {
    throw new Error("Utilisateur non connecté");
  }

  const { data, error } = await supabase
    .from("Trip")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Erreur Supabase: ${error.message}`);
  }

  return data || [];
};

// Hook réutilisable pour récupérer les trips
export const useFetchTrips = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery<Trip[], Error>({
    queryKey: ["trips", user?.id],
    queryFn: () => fetchTrips(user?.id),
  });
};

export const TripList = () => {
  const { data, isLoading, error } = useFetchTrips();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  if (!data) return null;
  console.log("Trips fetched:", data);
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>
          {p.title} : {p.description}, {p.start_date} to {p.end_date}
        </li>
      ))}
    </ul>
  );
};
