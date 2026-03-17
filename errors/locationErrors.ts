export type LocationStatus = "loading" | "granted" | "denied" | "unavailable";

export function getLocationErrorMessage(status: LocationStatus): string {
  switch (status) {
    case "denied":
      return "Location permission was denied. Please enable it in Settings.";
    case "unavailable":
      return "GPS is unavailable on this device.";
    default:
      return "An unknown location error occurred.";
  }
}