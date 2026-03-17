import { Text, View } from "react-native";

interface StatsBarProps {
  duration: string;
  distance: string;
}

export function StatsBar({ duration, distance }: StatsBarProps) {
  return (
    <View className="absolute top-12 left-4 right-4 bg-card rounded-2xl p-4 flex-row justify-around">
      <View className="items-center">
        <Text className="text-muted text-xs mb-1">Duration</Text>
        <Text className="text-white text-lg font-bold">⏱ {duration}</Text>
      </View>
      <View className="w-px bg-border" />
      <View className="items-center">
        <Text className="text-muted text-xs mb-1">Distance</Text>
        <Text className="text-white text-lg font-bold">📍 {distance}</Text>
      </View>
    </View>
  );
}