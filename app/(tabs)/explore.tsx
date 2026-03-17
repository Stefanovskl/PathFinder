import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useHistory } from "../../hooks/useHistory";

export default function HistoryScreen() {
  const { activities, loading } = useHistory();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-dark">
        <Text className="text-muted text-base">Loading...</Text>
      </View>
    );
  }

  if (activities.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-dark p-8">
        <Text className="text-4xl mb-4">🏃</Text>
        <Text className="text-white text-2xl font-bold mb-2">No Activities Yet</Text>
        <Text className="text-muted text-base text-center">
          Go record your first route!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark pt-14 px-4">
      <Text className="text-white text-2xl font-bold mb-4">Your Activities</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-card rounded-2xl p-4 mb-3 border border-border"
            onPress={() => router.push(`/activity/${item.id}` as any)}
          >
            <Text className="text-white font-bold text-base mb-2">📅 {item.date}</Text>
            <View className="flex-row justify-between">
              <Text className="text-muted text-sm">📍 {(item.distance / 1000).toFixed(2)} km</Text>
              <Text className="text-muted text-sm">⏱ {Math.floor(item.duration / 60)}m {item.duration % 60}s</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}