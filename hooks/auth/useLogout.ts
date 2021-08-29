import firebase from "../../utils/firebase";

type Props = {
  logout: () => void;
};

const useLogout = (): Props => {
  const logout = async () => {
    await firebase.auth().signOut();
  };

  return {
    logout,
  };
};

export default useLogout;
