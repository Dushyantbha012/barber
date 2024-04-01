import { atom } from "recoil";

export const isLoggedInAtom = atom<string | null>({
  key: "isLoggedInState",
  default: null,
});
