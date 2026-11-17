import { FilterValues, ToDoListType } from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export const deleteTodoListAC = createAction<{ id: string }>(
  "todolists/deleteTodolist",
);

export const createTodoListAC = createAction(
  "todolists/createTodoList",
  (title: string) => {
    return { payload: { title: title, id: nanoid() } };
  },
);

export const changeTodoListTitleAC = createAction<{
  title: string;
  id: string;
}>("todolists/changeTodoListTitle");

export const changeTodoListFilterAC = createAction<{
  id: string;
  filter: FilterValues;
}>("todolists/changeTodoListFilter");

const initialState: ToDoListType[] = [];

export const todolistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodoListAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    })
    .addCase(createTodoListAC, (state, action) => {
      let newTodoList: ToDoListType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      };
      state.push(newTodoList);
    })
    .addCase(changeTodoListTitleAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    })
    .addCase(changeTodoListFilterAC, (state, action) => {
      const elem = state.find((item) => item.id === action.payload.id);
      if (elem) {
        elem.filter = action.payload.filter;
      }
    });
});
