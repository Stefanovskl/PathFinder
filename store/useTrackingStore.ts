import { create } from "zustand";
import { Coordinate } from "../types/coordinate";

interface TrackingStore {
  isTracking: boolean;
  coordinates: Coordinate[];
  duration: number;
  distance: number;
  setIsTracking: (val: boolean) => void;
  addCoordinate: (coord: Coordinate) => void;
  incrementDuration: () => void;
  addDistance: (meters: number) => void;
  reset: () => void;
}

export const useTrackingStore = create<TrackingStore>((set) => ({
  isTracking: false,
  coordinates: [],
  duration: 0,
  distance: 0,

  setIsTracking: (val) => set({ isTracking: val }),
  addCoordinate: (coord) =>
    set((state) => ({ coordinates: [...state.coordinates, coord] })),
  incrementDuration: () =>
    set((state) => ({ duration: state.duration + 1 })),
  addDistance: (meters) =>
    set((state) => ({ distance: state.distance + meters })),
  reset: () =>
    set({ isTracking: false, coordinates: [], duration: 0, distance: 0 }),
}));