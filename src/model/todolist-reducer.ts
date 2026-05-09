import { v1 } from "uuid";
import { FilterValues, ToDoListType } from "../App";

type DeleteTodoListAction = ReturnType<typeof deleteTodoListAC>;

type AddTodoListAction = ReturnType<typeof addTodoListAC>;

type ChangeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>;

type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilterAC>;

type Action =
  | DeleteTodoListAction
  | AddTodoListAction
  | ChangeTodoListTitleAction
  | ChangeTodoListFilterAction;

const initialState: ToDoListType[] = [];

export const todolistReducer = (
  state: ToDoListType[] = initialState,
  action: Action,
): ToDoListType[] => {
  switch (action.type) {
    case "delete_todolist": {
      return state.filter((toDoList) => toDoList.id !== action.payload.id);
    }
    case "add_todolist": {
      let newTodoList: ToDoListType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      };
      return [...state, newTodoList];
    }
    case "change_todolist_title": {
      return state.map((todoList) =>
        todoList.id === action.payload.id
          ? { ...todoList, title: action.payload.title }
          : todoList,
      );
    }
    case "change_todolist_filter": {
      return state.map((todoList) =>
        todoList.id === action.payload.id
          ? { ...todoList, filter: action.payload.filter }
          : todoList,
      );
    }
    default: {
      return state;
    }
  }
};

export const deleteTodoListAC = (id: string) => {
  return {
    type: "delete_todolist",
    payload: {
      id: id,
    },
  } as const;
};

export const addTodoListAC = (title: string) => {
  return {
    type: "add_todolist",
    payload: {
      title: title,
      id: v1(),
    },
  } as const;
};

export const changeTodoListTitleAC = (payload: {
  title: string;
  id: string;
}) => {
  return {
    type: "change_todolist_title",
    payload: {
      id: payload.id,
      title: payload.title,
    },
  } as const;
};

export const changeTodoListFilterAC = (payload: {
  id: string;
  filter: FilterValues;
}) => {
  return {
    type: "change_todolist_filter",
    payload: {
      id: payload.id,
      filter: payload.filter,
    },
  } as const;
};
