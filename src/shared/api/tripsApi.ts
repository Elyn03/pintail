import { supabase } from './supabase';
import type { TripDto } from '@/entities/trip/trip-schema';

export const createTrip = async (tripData: Omit<TripDto, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('Trip')
    .insert([tripData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create trip: ${error.message}`);
  }

  return data as TripDto;
};

export const getUserTrips = async (userId: string): Promise<TripDto[]> => {
  const { data, error } = await supabase
    .from('Trip')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch trips: ${error.message}`);
  }

  return data || [];
};

export const getTripById = async (tripId: string): Promise<TripDto> => {
  const { data, error } = await supabase
    .from('Trip')
    .select('*')
    .eq('id', tripId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch trip: ${error.message}`);
  }

  return data as TripDto;
};

export const updateTrip = async (tripId: string, updates: Partial<TripDto>) => {
  const { data, error } = await supabase
    .from('Trip')
    .update(updates)
    .eq('id', tripId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update trip: ${error.message}`);
  }

  return data as TripDto;
};

export const deleteTrip = async (tripId: string): Promise<void> => {
  const { error } = await supabase
    .from('Trip')
    .delete()
    .eq('id', tripId);

  if (error) {
    throw new Error(`Failed to delete trip: ${error.message}`);
  }
};
