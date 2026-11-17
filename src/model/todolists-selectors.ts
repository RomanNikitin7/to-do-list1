import { RootState } from "../app/store";
import { ToDoListType } from "../app/App";

export const selectTodolists = (state: RootState): ToDoListType[] =>
  state.todolists;
