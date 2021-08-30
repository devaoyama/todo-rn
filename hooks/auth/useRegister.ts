import { useState } from "react";
import firebase from "../../utils/firebase";

type RegisterArgs = {
  email: string;
  password: string;
};

type Props = {
  isLoading: boolean;
  register: (params: RegisterArgs) => void;
};

const useRegister = (): Props => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async ({ email, password }: RegisterArgs) => {
    setIsLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    register,
  };
};

export default useRegister;
