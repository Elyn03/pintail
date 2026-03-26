import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTrendingCountries } from "./trendsApi";
import { queryKeys } from "./queryKeys";
import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "./tripsApi";
import type { TripDto } from "@/entities/trip/trip-schema";

/**
 * Hook pour récupérer les pays en tendance
 * @returns Query object avec data, isLoading, error, etc.
 */
export const useTrendingCountries = () => {
  return useQuery({
    queryKey: queryKeys.trending.countries(),
    queryFn: getTrendingCountries,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    throwOnError: false,
  });
};

/**
 * Hook pour créer un nouveau trip
 */
export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: (newTrip) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.list() });
      queryClient.setQueryData(
        queryKeys.trips.detail(newTrip.id + ""),
        newTrip,
      );
    },
  });
};

/**
 * Hook pour récupérer tous les trips d'un utilisateur
 */
export const useGetUserTrips = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.trips.list(userId),
    queryFn: () => getUserTrips(userId as string),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    throwOnError: false,
    enabled: !!userId,
  });
};

/**
 * Hook pour récupérer un trip par ID
 */
export const useGetTripById = (tripId: string) => {
  return useQuery({
    queryKey: queryKeys.trips.detail(tripId),
    queryFn: () => getTripById(tripId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    throwOnError: false,
  });
};

/**
 * Hook pour mettre à jour un trip
 */
export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tripId,
      updates,
    }: {
      tripId: string;
      updates: Partial<TripDto>;
    }) => updateTrip(tripId, updates),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.list() });
      queryClient.setQueryData(
        queryKeys.trips.detail(updatedTrip.id + ""),
        updatedTrip,
      );
    },
  });
};

/**
 * Hook pour supprimer un trip
 */
export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
    },
  });
};
