import { View } from "react-native";
import { LoadingScreen } from "../../components/LoadingScreen";
import { LocationError } from "../../components/LocationError";
import { Map } from "../../components/Map";
import { StatsBar } from "../../components/StatsBar";
import { TrackingButton } from "../../components/TrackingButton";
import { DEFAULT_LOCATION } from "../../constants/map";
import { useLocation } from "../../hooks/useLocation";
import { useTracking } from "../../hooks/useTracking";
import { styles } from "../../styles/mapScreen.styles";

export default function MapScreen() {
  const { location, status, requestLocation } = useLocation();
  const {
    isTracking,
    coordinates,
    duration,
    distance,
    startTracking,
    stopTracking,
    formatDuration,
    formatDistance,
  } = useTracking();

  if (status === "loading") {
    return <LoadingScreen message="Getting your location... 📍" />;
  }

  if (status === "denied" || status === "unavailable") {
    return <LocationError status={status} onRetry={requestLocation} />;
  }

  return (
    <View style={styles.container}>
      <Map
        latitude={location?.coords.latitude ?? DEFAULT_LOCATION.latitude}
        longitude={location?.coords.longitude ?? DEFAULT_LOCATION.longitude}
        coordinates={coordinates}
      />
      {isTracking && (
        <StatsBar
          duration={formatDuration(duration)}
          distance={formatDistance(distance)}
        />
      )}
      <TrackingButton
        isTracking={isTracking}
        onStart={startTracking}
        onStop={stopTracking}
      />
    </View>
  );
}