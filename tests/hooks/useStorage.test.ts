import AsyncStorage from "@react-native-async-storage/async-storage";
import { getActivities, saveActivity } from "../../hooks/useStorage";
import { Activity } from "../../types/activity";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const mockActivity: Activity = {
  id: "1",
  date: "17/03/2026",
  distance: 1500,
  duration: 600,
  coordinates: [{ latitude: 41.9981, longitude: 21.4254 }],
};

describe("useStorage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("returns empty array when no activities are stored", async () => {
    const result = await getActivities();
    expect(result).toEqual([]);
  });

  it("saves an activity and retrieves it", async () => {
    await saveActivity(mockActivity);
    const result = await getActivities();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("prepends new activity to existing list", async () => {
    const second: Activity = { ...mockActivity, id: "2" };
    await saveActivity(mockActivity);
    await saveActivity(second);
    const result = await getActivities();
    expect(result[0].id).toBe("2");
  });

  it("returns true on successful save", async () => {
    const success = await saveActivity(mockActivity);
    expect(success).toBe(true);
  });
});