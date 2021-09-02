import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import loginUserState from "../atoms/loginUser";
import firestoreSimple from "../utils/firestoreSimple";
import firebase from "../utils/firebase";

type AddArgs = {
  title: string;
};

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const loginUser = useRecoilValue(loginUserState);

  const todosCollection = useMemo(() => {
    return firestoreSimple.collection<Todo>({
      path: `/users/${loginUser?.uid}/todos`,
    });
  }, [loginUser]);

  useEffect(() => {
    const unsubscribe = todosCollection
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot, toObject) => {
        snapshot.docChanges().forEach((change) => {
          const todo = toObject(change.doc);
          switch (change.type) {
            case "added":
              setTodos((prev) => [todo, ...prev]);
              break;
            case "modified":
              setTodos((prev) =>
                prev.map((item) => (item.id === todo.id ? todo : item))
              );
              break;
            case "removed":
              setTodos((prev) => prev.filter((item) => item.id !== todo.id));
              break;
          }
        });
      });

    return () => unsubscribe();
  }, []);

  const add = async ({ title }: AddArgs) => {
    await todosCollection.add({
      title,
      isCompleted: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const remove = async (id: string) => {
    await todosCollection.delete(id);
  };

  const updateStatus = async (id: string, isCompleted: boolean) => {
    await todosCollection.update({
      id,
      isCompleted,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return {
    todos,
    add,
    remove,
    updateStatus,
  };
};

export default useTodo;
