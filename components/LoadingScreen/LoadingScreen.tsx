import { Text, View } from "react-native";

interface LoadingScreenProps {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <View className="flex-1 justify-center items-center bg-dark p-8">
      <Text className="text-muted text-base text-center">{message}</Text>
    </View>
  );
}