import { Text, TouchableOpacity, View } from "react-native";
import { getLocationErrorMessage, LocationStatus } from "../../errors/locationErrors";

interface LocationErrorProps {
  status: LocationStatus;
  onRetry: () => void;
}

export function LocationError({ status, onRetry }: LocationErrorProps) {
  return (
    <View className="flex-1 justify-center items-center bg-dark p-8">
      <Text className="text-4xl mb-4">📍</Text>
      <Text className="text-white text-xl font-bold mb-3 text-center">
        Location Access Needed
      </Text>
      <Text className="text-muted text-base text-center mb-8">
        {getLocationErrorMessage(status)}
      </Text>
      <TouchableOpacity
        className="bg-primary px-10 py-4 rounded-full w-full items-center"
        onPress={onRetry}
      >
        <Text className="text-white text-base font-bold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}