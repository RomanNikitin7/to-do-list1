import { v1 } from "uuid";
import { beforeEach, expect, test } from "vitest";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  deleteTodoListAC,
  todolistReducer,
  changeTodoListFilterAC,
} from "./todolist-reducer";
import { ToDoListType } from "../App";

let TODOLISTID1: string;
let TODOLISTID2: string;
let initialState: ToDoListType[] = [];

beforeEach(() => {
  TODOLISTID1 = v1();
  TODOLISTID2 = v1();
  initialState = [
    {
      id: TODOLISTID1,
      title: "Your skills",
      filter: "all",
    },
    {
      id: TODOLISTID2,
      title: "What to buy",
      filter: "all",
    },
  ];
});

test("todolist should be deleted", () => {
  const endState = todolistReducer(initialState, deleteTodoListAC(TODOLISTID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(TODOLISTID2);
});

test("todolist should be added", () => {
  const newTitle = "New ToDo List";

  const endState = todolistReducer(initialState, addTodoListAC(newTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTitle);
});

test("todo list title should be changed", () => {
  const title = "New ToDo List";
  const endState = todolistReducer(
    initialState,
    changeTodoListTitleAC({ id: TODOLISTID2, title }),
  );

  expect(endState[0].title).toBe("Your skills");
  expect(endState[1].title).toBe(title);
});

test("todo list filter should be changed", () => {
  const filter = "completed";
  const endState = todolistReducer(
    initialState,
    changeTodoListFilterAC({ id: TODOLISTID2, filter }),
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(filter);
});
