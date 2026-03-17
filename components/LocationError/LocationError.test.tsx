import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LocationError } from "./LocationError";

jest.mock("../../errors/locationErrors", () => ({
  getLocationErrorMessage: (status: string) => `Error: ${status}`,
}));

describe("LocationError", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<LocationError status="denied" onRetry={() => {}} />);
    expect(getByText("Location Access Needed")).toBeTruthy();
  });

  it("displays the error message for the given status", () => {
    const { getByText } = render(<LocationError status="denied" onRetry={() => {}} />);
    expect(getByText("Error: denied")).toBeTruthy();
  });

  it("calls onRetry when Try Again is pressed", () => {
    const onRetry = jest.fn();
    const { getByText } = render(<LocationError status="denied" onRetry={onRetry} />);
    fireEvent.press(getByText("Try Again"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});