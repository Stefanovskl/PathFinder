import { render } from "@testing-library/react-native";
import React from "react";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<LoadingScreen message="Loading..." />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("displays the message passed as prop", () => {
    const { getByText } = render(<LoadingScreen message="Fetching location..." />);
    expect(getByText("Fetching location...")).toBeTruthy();
  });
});