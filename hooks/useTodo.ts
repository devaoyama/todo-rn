import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import loginUserState from "../states/loginUser";
import firestoreSimple from "../utils/firestoreSimple";
import firebase from "../utils/firebase";
import { Todo, todoActions, todoSelectors } from "../states/todo";

type AddArgs = {
  title: string;
};

const useTodo = () => {
  const todos = todoSelectors.useTodos();
  const loginUser = useRecoilValue(loginUserState);
  const addTodo = todoActions.useAddTodo();
  const updateTodo = todoActions.useUpdateTodo();
  const removeTodo = todoActions.useRemoveTodo();

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
              addTodo(todo);
              break;
            case "modified":
              updateTodo(todo);
              break;
            case "removed":
              removeTodo(todo);
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
