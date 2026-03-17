import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleStorageError } from "../errors/storageErrors";
import { Activity } from "../types/activity";

export type { Activity };

export async function saveActivity(activity: Activity): Promise<boolean> {
  try {
    const existing = await getActivities();
    const updated = [activity, ...existing];
    await AsyncStorage.setItem("activities", JSON.stringify(updated));
    return true;
  } catch (error) {
    handleStorageError(error, "saveActivity");
    return false;
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const data = await AsyncStorage.getItem("activities");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    handleStorageError(error, "getActivities");
    return [];
  }
}