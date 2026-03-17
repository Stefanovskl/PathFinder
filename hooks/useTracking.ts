import * as Location from "expo-location";
import { useRef } from "react";
import { useTrackingStore } from "../store/useTrackingStore";
import { Coordinate } from "../types/coordinate";
import { saveActivity } from "./useStorage";

export function useTracking() {
  const {
    isTracking,
    coordinates,
    duration,
    distance,
    setIsTracking,
    addCoordinate,
    incrementDuration,
    addDistance,
    reset,
  } = useTrackingStore();

  const locationSubscription = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const coordinatesRef = useRef<Coordinate[]>([]);
  const distanceRef = useRef<number>(0);
  const durationRef = useRef<number>(0);

  const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
    const R = 6371e3;
    const lat1 = (coord1.latitude * Math.PI) / 180;
    const lat2 = (coord2.latitude * Math.PI) / 180;
    const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startTracking = async () => {
    reset();
    coordinatesRef.current = [];
    distanceRef.current = 0;
    durationRef.current = 0;
    setIsTracking(true);

    timerRef.current = setInterval(() => {
      incrementDuration();
      durationRef.current += 1;
    }, 1000);

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        const newCoord: Coordinate = {
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        };

        if (coordinatesRef.current.length > 0) {
          const added = calculateDistance(
            coordinatesRef.current[coordinatesRef.current.length - 1],
            newCoord
          );
          addDistance(added);
          distanceRef.current += added;
        }

        addCoordinate(newCoord);
        coordinatesRef.current = [...coordinatesRef.current, newCoord];
      }
    );
  };

  const stopTracking = async () => {
    setIsTracking(false);
    locationSubscription.current?.remove();
    clearInterval(timerRef.current);

    if (coordinatesRef.current.length > 0) {
      await saveActivity({
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        distance: distanceRef.current,
        duration: durationRef.current,
        coordinates: coordinatesRef.current,
      });
    }
  };

  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatDistance = (meters: number): string => {
    return (meters / 1000).toFixed(2) + " km";
  };

  return {
    isTracking,
    coordinates,
    duration,
    distance,
    startTracking,
    stopTracking,
    formatDuration,
    formatDistance,
  };
}