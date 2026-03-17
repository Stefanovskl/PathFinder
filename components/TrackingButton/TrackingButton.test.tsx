import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TrackingButton } from "./TrackingButton";

describe("TrackingButton", () => {
  it("shows Start Tracking when not tracking", () => {
    const { getByText } = render(
      <TrackingButton isTracking={false} onStart={() => {}} onStop={() => {}} />
    );
    expect(getByText(/Start Tracking/)).toBeTruthy();
  });

  it("shows Stop & Save when tracking", () => {
    const { getByText } = render(
      <TrackingButton isTracking={true} onStart={() => {}} onStop={() => {}} />
    );
    expect(getByText(/Stop & Save/)).toBeTruthy();
  });

  it("calls onStart when pressed and not tracking", () => {
    const onStart = jest.fn();
    const { getByText } = render(
      <TrackingButton isTracking={false} onStart={onStart} onStop={() => {}} />
    );
    fireEvent.press(getByText(/Start Tracking/));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("calls onStop when pressed and tracking", () => {
    const onStop = jest.fn();
    const { getByText } = render(
      <TrackingButton isTracking={true} onStart={() => {}} onStop={onStop} />
    );
    fireEvent.press(getByText(/Stop & Save/));
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});