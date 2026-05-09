import { beforeEach, expect, test } from "vitest";
import { TasksTypeArr } from "../App";
import {
  CreateTaskAC,
  CreateTodoListAC,
  DeleteTodoListAC,
  tasksReducer,
  DeleteTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
} from "./tasks-reducer";

let startState: TasksTypeArr = {};

beforeEach(() => {
  startState = {
    TODOLISTID1: [
      { id: "task1", title: "HTML&CSS", isDone: true },
      { id: "task2", title: "JS", isDone: true },
      { id: "task3", title: "ReactJS", isDone: false },
    ],

    TODOLISTID2: [
      { id: "task1", title: "Bread", isDone: true },
      { id: "task2", title: "Milk", isDone: true },
      { id: "task3", title: "Meat", isDone: false },
    ],
  };
});

test("task should be created", () => {
  const newTask = "new task";
  const endState = tasksReducer(
    startState,
    CreateTaskAC(newTask, "TODOLISTID1"),
  );

  expect(endState["TODOLISTID1"].length).toBe(4);
  const newTaskFound = endState["TODOLISTID1"].find((t) => t.title === newTask);
  expect(newTaskFound).not.toBeUndefined();
});

test("todolist should be created", () => {
  const endState = tasksReducer(startState, CreateTodoListAC("todolistid3"));

  const keys = Object.keys(endState);

  const newKey = keys.find((k) => k !== "TODOLISTID1" && k !== "TODOLISTID2");

  if (!newKey) {
    throw Error("key is not added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("todolist should be deleted", () => {
  const endState = tasksReducer(startState, DeleteTodoListAC("TODOLISTID1"));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["TODOLISTID1"]).not.toBeDefined();
});

test("task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    DeleteTaskAC("task2", "TODOLISTID1"),
  );

  expect(endState["TODOLISTID1"].length).toBe(2);
  const deletedTask = endState["TODOLISTID1"].find((t) => t.id === "task2");
  expect(deletedTask).toBeUndefined();
});

test("task status should be changed", () => {
  const newStatus = false;
  const endState = tasksReducer(
    startState,
    ChangeTaskStatusAC("task1", newStatus, "TODOLISTID1"),
  );

  const task1 = endState["TODOLISTID1"].find((t) => t.id === "task1");
  const task2 = endState["TODOLISTID1"].find((t) => t.id === "task2");

  expect(task1?.isDone).toBe(newStatus);
  expect(task2?.isDone).toBe(true);
});

test("task title should be changed", () => {
  const newTitle = "new title";

  const endState = tasksReducer(
    startState,
    ChangeTaskTitleAC("task1", newTitle, "TODOLISTID1"),
  );

  const task1 = endState["TODOLISTID1"].find((t) => t.id === "task1");
  const task2 = endState["TODOLISTID1"].find((t) => t.id === "task2");

  expect(task1?.title).toBe(newTitle);
  expect(task2?.title).toBe("JS");
});
