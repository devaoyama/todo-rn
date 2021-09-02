import { useEffect } from "react";
import { useRecoilState } from "recoil";
import firebase from "../../utils/firebase";
import loginUserState from "../../states/loginUser";

type Props = {
  loginUser: firebase.User | null | undefined;
};

const useAuth = (): Props => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setLoginUser);
  }, []);

  return {
    loginUser,
  };
};

export default useAuth;
