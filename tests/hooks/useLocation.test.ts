import { renderHook, waitFor } from "@testing-library/react-native";
import * as Location from "expo-location";
import { useLocation } from "../../hooks/useLocation";

jest.mock("expo-location");

const mockLocation = {
  coords: { latitude: 41.9981, longitude: 21.4254 },
} as Location.LocationObject;

describe("useLocation", () => {
  it("starts with loading status", () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(mockLocation);

    const { result } = renderHook(() => useLocation());
    expect(result.current.status).toBe("loading");
  });

  it("sets status to granted and returns location on success", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(mockLocation);

    const { result } = renderHook(() => useLocation());

    await waitFor(() => expect(result.current.status).toBe("granted"));
    expect(result.current.location).toEqual(mockLocation);
  });

  it("sets status to denied when permission is not granted", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: "denied" });

    const { result } = renderHook(() => useLocation());

    await waitFor(() => expect(result.current.status).toBe("denied"));
    expect(result.current.location).toBeNull();
  });

  it("sets status to unavailable on error", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useLocation());

    await waitFor(() => expect(result.current.status).toBe("unavailable"));
  });
});