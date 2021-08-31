import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import loginUserState from "../atoms/loginUser";
import firebase from "../utils/firebase";

type AddArgs = {
  title: string;
};

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const loginUser = useRecoilValue(loginUserState);

  useEffect(() => {
    console.log("Hello");
    if (!loginUser) return;
    firebase
      .firestore()
      .collection("users")
      .doc(loginUser.uid)
      .collection("todos")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              isCompleted: data.isCompleted,
            };
          })
        );
      });
  }, []);

  const add = async ({ title }: AddArgs) => {
    if (!loginUser) return;
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(loginUser.uid)
      .collection("todos")
      .add({ title, isCompleted: false });
    setTodos([
      ...todos,
      {
        id: doc.id,
        title: title,
        isCompleted: false,
      },
    ]);
  };

  const remove = async (id: string) => {
    if (!loginUser) return;
    await firebase
      .firestore()
      .collection("users")
      .doc(loginUser.uid)
      .collection("todos")
      .doc(id)
      .delete();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateStatus = async (id: string, isCompleted: boolean) => {
    if (!loginUser) return;
    await firebase
      .firestore()
      .collection("users")
      .doc(loginUser.uid)
      .collection("todos")
      .doc(id)
      .update({ isCompleted });
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isCompleted } : todo;
      })
    );
  };

  return {
    todos,
    add,
    remove,
    updateStatus,
  };
};

export default useTodo;
