import { create } from "zustand";
import { Activity, getActivities } from "../hooks/useStorage";

interface ActivitiesStore {
  activities: Activity[];
  loading: boolean;
  loadActivities: () => Promise<void>;
}

export const useActivitiesStore = create<ActivitiesStore>((set) => ({
  activities: [],
  loading: true,

  loadActivities: async () => {
    const data = await getActivities();
    set({ activities: data, loading: false });
  },
}));