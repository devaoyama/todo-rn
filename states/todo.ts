import {
  atomFamily,
  selectorFamily,
  atom,
  useRecoilValue,
  selector,
  DefaultValue,
  useRecoilCallback,
} from "recoil";
import loginUserState from "./loginUser";
import { RecoilAtomKeys, RecoilSelectorKeys } from "./keys";
import firestoreSimple from "../utils/firestoreSimple";

type TodoId = string;

export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TodoActions = {
  useAddTodo: () => (todo: Todo) => void;
  useUpdateTodo: () => (todo: Todo) => void;
  useRemoveTodo: () => (todo: Todo) => void;
};

type TodoSelectors = {
  useTodo: (id: string) => Todo | undefined;
  useTodos: () => Todo[];
};

export const todoState = atomFamily<Todo | undefined, TodoId>({
  key: RecoilAtomKeys.TODO_STATE,
  default: undefined,
});

export const todoSelector = selectorFamily<Todo | undefined, TodoId>({
  key: RecoilSelectorKeys.TODO_TODO,
  get:
    (id) =>
    async ({ get }) => {
      const todo = get(todoState(id));
      if (todo !== undefined) return todo;
      const user = get(loginUserState);
      if (!user) throw Error;
      console.log("Call firestore");
      const todoCollection = firestoreSimple.collection<Todo>({
        path: `/users/${user.uid}/todos`,
      });
      return await todoCollection.fetch(id);
    },
});

const todosState = atom<TodoId[]>({
  key: RecoilAtomKeys.TODOS_STATE,
  default: [],
});

const todosSelectors = selector<Todo[]>({
  key: RecoilSelectorKeys.TODO_TODOS,
  get: ({ get }) => {
    const todoIds = get(todosState);
    return todoIds.reduce<Todo[]>((result, id) => {
      const todo = get(todoSelector(id));
      if (todo) result.push(todo);
      return result;
    }, []);
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const todoIds = newValue.map((todo) => {
      set(todoState(todo.id), todo);
      return todo.id;
    });
    set(todosState, todoIds);
  },
});

export const todoActions: TodoActions = {
  useAddTodo: () =>
    useRecoilCallback(
      ({ set }) =>
        (todo: Todo) => {
          set(todosState, (prev) => [...prev, todo.id]);
          set(todoState(todo.id), todo);
        },
      []
    ),
  useUpdateTodo: () =>
    useRecoilCallback(({ set }) => (todo: Todo) => {
      set(todoState(todo.id), (prev) => ({ ...prev, ...todo }));
    }),
  useRemoveTodo: () =>
    useRecoilCallback(({ set, reset }) => (todo: Todo) => {
      set(todosState, (prev) => prev.filter((id) => id !== todo.id));
      reset(todoState(todo.id));
    }),
};

export const todoSelectors: TodoSelectors = {
  useTodo: (id) => useRecoilValue(todoSelector(id)),
  useTodos: () => useRecoilValue(todosSelectors),
};
