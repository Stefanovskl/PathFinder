import { render } from "@testing-library/react-native";
import React from "react";
import { StatsBar } from "./StatsBar";

describe("StatsBar", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<StatsBar duration="00:00" distance="0.00 km" />);
    expect(getByText(/00:00/)).toBeTruthy();
  });

  it("displays the duration prop", () => {
    const { getByText } = render(<StatsBar duration="01:30" distance="0.00 km" />);
    expect(getByText(/01:30/)).toBeTruthy();
  });

  it("displays the distance prop", () => {
    const { getByText } = render(<StatsBar duration="00:00" distance="1.50 km" />);
    expect(getByText(/1.50 km/)).toBeTruthy();
  });
});