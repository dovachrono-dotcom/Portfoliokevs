"use client";

/** Portfolio motion starts automatically, without a visitor setting or saved override. */
export function useReducedMotion(): boolean {
  return false;
}

const noPreferenceChange: (type: "change", listener: () => void) => void = () => undefined;

/** Keep imperative controllers on the same automatic playback policy. */
export function motionPreference() {
  return {
    matches: false,
    addEventListener: noPreferenceChange,
    removeEventListener: noPreferenceChange,
  };
}
