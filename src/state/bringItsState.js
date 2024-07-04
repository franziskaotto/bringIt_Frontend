import { atom } from "recoil";

export const bringItsState = atom({
  // unique ID (with respect to other atoms/selectors)
  key: "bringItsState",
  default: 0, // default value (aka initial value)
});
