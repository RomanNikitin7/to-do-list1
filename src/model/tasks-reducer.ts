import { createAction, nanoid } from "@reduxjs/toolkit";
import { TasksTypeArr } from "../app/App";
import { createTodoListAC, deleteTodoListAC } from "./todolist-reducer";
import { createReducer } from "@reduxjs/toolkit";

const startState: TasksTypeArr = {};

export const createTaskAC = createAction<{ title: string; toDoListId: string }>(
  "tasks/createTask",
);

export const deleteTaskAC = createAction<{
  taskId: string;
  toDoListId: string;
}>("tasks/deleteTask");

export const changeTaskStatusAC = createAction<{
  taskId: string;
  isDone: boolean;
  toDoListId: string;
}>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{
  taskId: string;
  spanTitle: string;
  toDoListId: string;
}>("tasks/changeTaskTitle");

export const tasksReducer = createReducer(startState, (builder) => {
  builder
    .addCase(createTodoListAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(deleteTodoListAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.toDoListId].unshift({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      });
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.toDoListId].findIndex(
        (todo) => todo.id === action.payload.taskId,
      );
      if (index !== -1) state[action.payload.toDoListId].splice(index, 1);
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.toDoListId].find(
        (task) => task.id === action.payload.taskId,
      );

      if (task) {
        task.isDone = action.payload.isDone;
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.toDoListId].find(
        (task) => task.id === action.payload.taskId,
      );

      if (task) {
        task.title = action.payload.spanTitle;
      }
    });
});
