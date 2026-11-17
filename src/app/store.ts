import { combineReducers, configureStore, nanoid } from "@reduxjs/toolkit";
import { tasksReducer } from "../model/tasks-reducer";
import { todolistReducer } from "../model/todolist-reducer";
import type { TasksTypeArr, ToDoListType } from "./App";

const TODOLISTID1 = nanoid();
const TODOLISTID2 = nanoid();

const initialTodolists: ToDoListType[] = [
  { id: TODOLISTID1, title: "Your skills", filter: "all" },
  { id: TODOLISTID2, title: "What to buy", filter: "all" },
];

const initialTasks: TasksTypeArr = {
  [TODOLISTID1]: [
    { id: nanoid(), title: "HTML&CSS", isDone: true },
    { id: nanoid(), title: "JS", isDone: true },
    { id: nanoid(), title: "ReactJS", isDone: false },
  ],
  [TODOLISTID2]: [
    { id: nanoid(), title: "Bread", isDone: true },
    { id: nanoid(), title: "Milk", isDone: true },
    { id: nanoid(), title: "Meat", isDone: false },
  ],
};

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
});

// создание store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    todolists: initialTodolists,
    tasks: initialTasks,
  },
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
