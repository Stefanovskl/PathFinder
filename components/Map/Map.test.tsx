import React from "react";
import { render } from "@testing-library/react-native";
import { Map } from "./Map";

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: ({ children }: any) => <View testID="map-view">{children}</View>,
    Polyline: ({ testID }: any) => <View testID={testID} />,
    UrlTile: () => null,
  };
});

jest.mock("../../constants/map", () => ({
  MAP_DELTA: { latitudeDelta: 0.01, longitudeDelta: 0.01 },
  MAPTILER_KEY: "test-key",
}));

describe("Map", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Map latitude={41.99} longitude={21.42} coordinates={[]} />
    );
    expect(getByTestId("map-view")).toBeTruthy();
  });

  it("does not render polyline when fewer than 2 coordinates", () => {
    const { queryByTestId } = render(
      <Map latitude={41.99} longitude={21.42} coordinates={[{ latitude: 41.99, longitude: 21.42 }]} />
    );
    expect(queryByTestId("polyline")).toBeNull();
  });
});