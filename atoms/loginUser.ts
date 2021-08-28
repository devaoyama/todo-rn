import { atom } from "recoil";
import type firebase from "firebase/app";

type LoginUserState = firebase.User | null | undefined;

const loginUserState = atom<LoginUserState>({
  key: "loginUserState",
  default: undefined,
  dangerouslyAllowMutability: true,
});

export default loginUserState;
