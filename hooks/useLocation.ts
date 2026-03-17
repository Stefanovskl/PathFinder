import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { LocationStatus } from "../errors/locationErrors";

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [status, setStatus] = useState<LocationStatus>("loading");

  const requestLocation = async () => {
    setStatus("loading");
    try {
      const { status: permissionStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (permissionStatus !== "granted") {
        setStatus("denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setStatus("granted");
    } catch (error) {
      setStatus("unavailable");
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { location, status, requestLocation };
}