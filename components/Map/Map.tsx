import { StyleSheet } from "react-native";
import MapView, { Polyline, UrlTile } from "react-native-maps";
import { MAP_DELTA, MAPTILER_KEY } from "../../constants/map";
import { Coordinate } from "../../types/coordinate";

interface MapProps {
  latitude: number;
  longitude: number;
  coordinates: Coordinate[];
}

export function Map({ latitude, longitude, coordinates }: MapProps) {
  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      mapType="none"
      backgroundColor="#111827"
      userInterfaceStyle="dark"
      showsPointsOfInterest={false}
      showsBuildings={false}
      showsTraffic={false}
      showsIndoors={false}
      legalLabelInsets={{ bottom: -100, left: 0, top: 0, right: 0 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: MAP_DELTA.latitudeDelta,
        longitudeDelta: MAP_DELTA.longitudeDelta,
      }}
    >
      <UrlTile
        urlTemplate={`https://api.maptiler.com/maps/streets-dark/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
        maximumZ={19}
        tileSize={256}
        flipY={false}
        shouldReplaceMapContent={true}
      />
      {coordinates.length > 1 && (
        <Polyline
          coordinates={coordinates}
          strokeColor="#22C55E"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});