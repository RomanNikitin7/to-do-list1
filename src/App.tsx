import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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

type ThemeMode = "dark" | "light";

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

  const addTodoList = (todoListTitle: string) => {
    let todoListId = v1();
    let newTodoList: ToDoListType = {
      id: todoListId,
      title: todoListTitle,
      filter: "all",
    };
    setToDoLists([...toDoLists, newTodoList]);
    setTasks({ ...tasks, [todoListId]: [] });
  };

  const handleChangeTodoListTitle = (
    spanTitle: string,
    toDoListId: ToDoListType["id"],
  ) => {
    setToDoLists(
      toDoLists.map((todoList) =>
        todoList.id === toDoListId
          ? { ...todoList, title: spanTitle }
          : todoList,
      ),
    );
  };

  const handleChangeTaskTitle = (
    taskId: string,
    spanTitle: string,
    toDoListId: ToDoListType["id"],
  ) => {
    setTasks({
      ...tasks,
      [toDoListId]: tasks[toDoListId].map((task) =>
        task.id === taskId ? { ...task, title: spanTitle } : task,
      ),
    });
  };
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: themeMode === "light" ? "#2563eb" : "#60a5fa",
      },
      secondary: {
        main: themeMode === "light" ? "#7c3aed" : "#a78bfa",
      },
      background: {
        default: themeMode === "light" ? "#f5f7fb" : "#0f172a",
        paper: themeMode === "light" ? "#ffffff" : "#111827",
      },
      text: {
        primary: themeMode === "light" ? "#0f172a" : "#e5e7eb",
        secondary: themeMode === "light" ? "#475569" : "#94a3b8",
      },
    },
  });

  const changeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ButtonAppBar onChange={changeMode} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Форма добавления */}
          <Grid container sx={{ mb: 6, justifyContent: "center" }}>
            <Paper
              sx={{
                p: 2,
                width: "100%",
                maxWidth: "600px",
                borderRadius: "12px",
              }}
              elevation={2}
            >
              <AddItemForm addItem={addTodoList} />
            </Paper>
          </Grid>

          <Box
            sx={{
              display: "grid",
              // Твоя логика: 3 колонки на десктопе, 2 на планшете, 1 на мобилке
              gridTemplateColumns: {
                xs: "1fr", // Мобильные: 100%
                sm: "repeat(2, minmax(0, 1fr))", // Планшеты: 2 колонки
                md: "repeat(3, minmax(0, 1fr))", // Большие экраны: 3 колонки
              },
              gap: "30px", // Твой фиксированный зазор
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {toDoLists.map((tl) => (
              <Paper
                key={tl.id}
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0, // КРИТИЧНО: позволяет контенту внутри сжиматься и не распирать грид
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <TodolistItem
                  id={tl.id}
                  title={tl.title}
                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                  deleteTask={deleteTask}
                  changeFilter={changeTodoListFilter}
                  createTask={createTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={tl.filter}
                  deleteTodoList={deleteTodoList}
                  onChangeTodoListTitle={handleChangeTodoListTitle}
                  onChangeTaskTitle={handleChangeTaskTitle}
                />
              </Paper>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
