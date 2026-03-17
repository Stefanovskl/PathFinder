import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Polyline, UrlTile } from "react-native-maps";
import { MAPTILER_KEY, MAP_DELTA } from "../../constants/map";
import { useActivityDetail } from "../../hooks/useActivityDetail";

export default function ActivityDetail() {
  const { activity, loading, center } = useActivityDetail();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-dark">
        <Text className="text-muted text-base">Loading...</Text>
      </View>
    );
  }

  if (!activity || !center) {
    return (
      <View className="flex-1 justify-center items-center bg-dark">
        <Text className="text-white text-xl font-bold mb-2">Activity not found!</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-base">← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark">

      {/* HEADER */}
      <View className="pt-14 px-4 pb-4 bg-card border-b border-border flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Activity Detail</Text>
      </View>

      {/* STATS */}
      <View className="flex-row px-4 py-4 gap-3">
        <View className="flex-1 bg-card rounded-2xl p-4 items-center border border-border">
          <Text className="text-muted text-xs mb-1">📅 Date</Text>
          <Text className="text-white font-bold text-sm">{activity.date}</Text>
        </View>
        <View className="flex-1 bg-card rounded-2xl p-4 items-center border border-border">
          <Text className="text-muted text-xs mb-1">📍 Distance</Text>
          <Text className="text-white font-bold text-sm">
            {(activity.distance / 1000).toFixed(2)} km
          </Text>
        </View>
        <View className="flex-1 bg-card rounded-2xl p-4 items-center border border-border">
          <Text className="text-muted text-xs mb-1">⏱ Duration</Text>
          <Text className="text-white font-bold text-sm">
            {Math.floor(activity.duration / 60)}m {activity.duration % 60}s
          </Text>
        </View>
      </View>

      {/* MAP */}
      <View className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden">
        <MapView
          style={{ flex: 1 }}
          scrollEnabled={false}
          zoomEnabled={false}
          mapType="none"
          backgroundColor="#111827"
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
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
          <Polyline
            coordinates={activity.coordinates}
            strokeColor="#22C55E"
            strokeWidth={4}
          />
        </MapView>
      </View>

    </View>
  );
}