import * as Storage from "../../hooks/useStorage";
import { useActivitiesStore } from "../../store/useActivitiesStore";
import { Activity } from "../../types/activity";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("../../hooks/useStorage");

const mockActivities: Activity[] = [
  {
    id: "1",
    date: "17/03/2026",
    distance: 2000,
    duration: 900,
    coordinates: [{ latitude: 41.9981, longitude: 21.4254 }],
  },
];

describe("useActivitiesStore", () => {
  beforeEach(() => {
    useActivitiesStore.setState({ activities: [], loading: true });
  });

  it("has correct initial state", () => {
    const state = useActivitiesStore.getState();
    expect(state.activities).toEqual([]);
    expect(state.loading).toBe(true);
  });

  it("loadActivities fetches and sets activities", async () => {
    (Storage.getActivities as jest.Mock).mockResolvedValue(mockActivities);

    await useActivitiesStore.getState().loadActivities();

    const state = useActivitiesStore.getState();
    expect(state.activities).toEqual(mockActivities);
    expect(state.loading).toBe(false);
  });

  it("sets loading to false even when activities are empty", async () => {
    (Storage.getActivities as jest.Mock).mockResolvedValue([]);

    await useActivitiesStore.getState().loadActivities();

    expect(useActivitiesStore.getState().loading).toBe(false);
  });
});