import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Activity, getActivities } from "./useStorage";

export function useActivityDetail() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const all = await getActivities();
      const found = all.find((a) => a.id === id);
      setActivity(found || null);
      setLoading(false);
    };
    load();
  }, [id]);

  const center = activity
    ? activity.coordinates[Math.floor(activity.coordinates.length / 2)]
    : null;

  return { activity, loading, center };
}