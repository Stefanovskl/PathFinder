import { Text, TouchableOpacity } from "react-native";

interface TrackingButtonProps {
  isTracking: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function TrackingButton({ isTracking, onStart, onStop }: TrackingButtonProps) {
  return (
    <TouchableOpacity
      className={`absolute bottom-10 self-center px-10 py-4 rounded-full shadow-lg ${
        isTracking ? "bg-danger" : "bg-primary"
      }`}
      onPress={isTracking ? onStop : onStart}
    >
      <Text className="text-white text-lg font-bold tracking-wide">
        {isTracking ? "⏹ Stop & Save" : "▶ Start Tracking"}
      </Text>
    </TouchableOpacity>
  );
}