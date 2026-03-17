import { renderHook } from "@testing-library/react-native";
import { useTracking } from "../../hooks/useTracking";

jest.mock("expo-location", () => ({
  watchPositionAsync: jest.fn(() => Promise.resolve({ remove: jest.fn() })),
  Accuracy: { High: 4 },
}));

jest.mock("../../hooks/useStorage", () => ({
  saveActivity: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("../../store/useTrackingStore", () => ({
  useTrackingStore: () => ({
    isTracking: false,
    coordinates: [],
    duration: 0,
    distance: 0,
    setIsTracking: jest.fn(),
    addCoordinate: jest.fn(),
    incrementDuration: jest.fn(),
    addDistance: jest.fn(),
    reset: jest.fn(),
  }),
}));

describe("useTracking", () => {
  it("formats duration correctly", () => {
    const { result } = renderHook(() => useTracking());
    expect(result.current.formatDuration(90)).toBe("01:30");
    expect(result.current.formatDuration(0)).toBe("00:00");
  });

  it("formats distance correctly", () => {
    const { result } = renderHook(() => useTracking());
    expect(result.current.formatDistance(1000)).toBe("1.00 km");
    expect(result.current.formatDistance(500)).toBe("0.50 km");
  });

  it("exposes expected tracking controls", () => {
    const { result } = renderHook(() => useTracking());
    expect(typeof result.current.startTracking).toBe("function");
    expect(typeof result.current.stopTracking).toBe("function");
  });
});