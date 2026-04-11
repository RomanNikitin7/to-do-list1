import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksTypeArr = {
  [toDoListId: string]: Task[];
};

export const App = () => {
  const TODOLISTID1 = v1();
  const TODOLISTID2 = v1();
  const [toDoLists, setToDoLists] = useState<ToDoListType[]>([
    {
      id: TODOLISTID1,
      title: "Your skills",
      filter: "all",
    },
    {
      id: TODOLISTID2,
      title: "Your skills",
      filter: "all",
    },
  ]);

  const [tasks, setTasks] = useState<TasksTypeArr>({
    [TODOLISTID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],

    [TODOLISTID2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
    ],
  });

  const deleteTask = (taskId: string, toDoListId: ToDoListType["id"]) => {
    setTasks({
      ...tasks,
      [toDoListId]: tasks[toDoListId].filter((task) => taskId !== task["id"]),
    });
  };

  const createTask = (title: string, toDoListId: ToDoListType["id"]) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [toDoListId]: [newTask, ...tasks[toDoListId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    toDoListId: ToDoListType["id"],
  ) => {
    setTasks({
      ...tasks,
      [toDoListId]: tasks[toDoListId].map((task) =>
        task.id === taskId ? { ...task, isDone: isDone } : task,
      ),
    });
  };

  const changeTodoListFilter = (
    filter: FilterValues,
    toDoListId: ToDoListType["id"],
  ) => {
    setToDoLists(
      toDoLists.map((todoList) =>
        todoList.id === toDoListId ? { ...todoList, filter: filter } : todoList,
      ),
    );
  };

  const deleteTodoList = (toDoListId: ToDoListType["id"]) => {
    setToDoLists(toDoLists.filter((toDoList) => toDoList.id !== toDoListId));
    let copyTasks = { ...tasks };
    delete copyTasks[toDoListId];
    setTasks(copyTasks);
  };

  const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
    let filteredTasks = tasks;
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone);
    }
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.isDone);
    }
    return filteredTasks;
  };

  return (
    <div className="app">
      {toDoLists.map((tl) => {
        return (
          <TodolistItem
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
            deleteTask={deleteTask}
            changeFilter={changeTodoListFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            deleteTodoList={deleteTodoList}
          />
        );
      })}
    </div>
  );
};
