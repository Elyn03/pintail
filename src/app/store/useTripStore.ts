import { create } from 'zustand';
import type {TripDto} from "@/entities/trip/trip-schema.ts";

interface TripState {
  trips: TripDto[];
  addTrip: (item: TripDto) => void;
  deleteTrip: (id: TripDto["id"]) => void;
}

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, trip],
    })),

  deleteTrip: (id: TripDto["id"]) =>
    set((state) => ({
      trips: state.trips.filter((i) => i.id !== id),
    })),
}));