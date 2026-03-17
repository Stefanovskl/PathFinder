import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useActivitiesStore } from "../store/useActivitiesStore";

export function useHistory() {
  const { activities, loading, loadActivities } = useActivitiesStore();

  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  return { activities, loading };
}