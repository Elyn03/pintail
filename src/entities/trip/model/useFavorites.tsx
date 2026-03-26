import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/features/add-to-fav/ui/add-to-fav";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { data: favorites = [] } = useFavorites();

  return useMutation({
    mutationFn: (tripId: number) =>
      favorites.includes(tripId) ? removeFavorite(tripId) : addFavorite(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
