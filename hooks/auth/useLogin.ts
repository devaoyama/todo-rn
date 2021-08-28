import { useState } from "react";
import firebase from "../../utils/firebase";

type LoginArgs = {
  email: string;
  password: string;
};

type Props = {
  isLoading: boolean;
  login: (params: LoginArgs) => void;
};

const useLogin = (): Props => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async ({ email, password }: LoginArgs) => {
    setIsLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    login,
  };
};

export default useLogin;
