import "./App.css";
import { useReducer, useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  deleteTodoListAC,
  todolistReducer,
} from "./model/todolist-reducer";
import {
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  CreateTaskAC,
  CreateTodoListAC,
  DeleteTaskAC,
  DeleteTodoListAC,
  tasksReducer,
} from "./model/tasks-reducer";

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

const TODOLISTID1 = v1();
const TODOLISTID2 = v1();

const startState: ToDoListType[] = [
  { id: TODOLISTID1, title: "Your skills", filter: "all" },
  { id: TODOLISTID2, title: "What to buy", filter: "all" },
];

const startStateTasks: TasksTypeArr = {
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
};

export const App = () => {
  const [toDoLists, dispatchToDoLists] = useReducer(
    todolistReducer,
    startState,
  );

  const [tasks, dispatchTasks] = useReducer(tasksReducer, startStateTasks);

  const deleteTask = (taskId: string, toDoListId: string) => {
    // setTasks({
    //   ...tasks,
    //   [toDoListId]: tasks[toDoListId].filter((task) => taskId !== task["id"]),
    // });
    dispatchTasks(DeleteTaskAC(taskId, toDoListId));
  };

  const createTask = (title: string, toDoListId: string) => {
    dispatchTasks(CreateTaskAC(title, toDoListId));
    // const newTask = { id: v1(), title, isDone: false };
    // setTasks({ ...tasks, [toDoListId]: [newTask, ...tasks[toDoListId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    toDoListId: string,
  ) => {
    // setTasks({
    //   ...tasks,
    //   [toDoListId]: tasks[toDoListId].map((task) =>
    //     task.id === taskId ? { ...task, isDone: isDone } : task,
    //   ),
    // });
    dispatchTasks(ChangeTaskStatusAC(taskId, isDone, toDoListId));
  };

  const changeTodoListFilter = (filter: FilterValues, toDoListId: string) => {
    dispatchToDoLists(changeTodoListFilterAC({ filter, id: toDoListId }));
    // setToDoLists(
    //   toDoLists.map((todoList) =>
    //     todoList.id === toDoListId ? { ...todoList, filter: filter } : todoList,
    //   ),
    // );
  };

  const deleteTodoList = (toDoListId: string) => {
    // setToDoLists(toDoLists.filter((toDoList) => toDoList.id !== toDoListId));
    dispatchToDoLists(deleteTodoListAC(toDoListId));
    dispatchTasks(DeleteTodoListAC(toDoListId));
    // let copyTasks = { ...tasks };
    // delete copyTasks[toDoListId];
    // setTasks(copyTasks);
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
    // let todoListId = v1();
    // let newTodoList: ToDoListType = {
    //   id: todoListId,
    //   title: todoListTitle,
    //   filter: "all",
    // };
    // setToDoLists([...toDoLists, newTodoList]);
    // setTasks({ ...tasks, [todoListId]: [] });
    const action = addTodoListAC(todoListTitle);
    dispatchToDoLists(action);
    dispatchTasks(CreateTodoListAC(action.payload.id));
    // setTasks({ ...tasks, [obj.payload.id]: [] });
  };

  const handleChangeTodoListTitle = (spanTitle: string, toDoListId: string) => {
    dispatchToDoLists(
      changeTodoListTitleAC({ title: spanTitle, id: toDoListId }),
    );
    // setToDoLists(
    //   toDoLists.map((todoList) =>
    //     todoList.id === toDoListId
    //       ? { ...todoList, title: spanTitle }
    //       : todoList,
    //   ),
    // );
  };

  const handleChangeTaskTitle = (
    taskId: string,
    spanTitle: string,
    toDoListId: string,
  ) => {
    // setTasks({
    //   ...tasks,
    //   [toDoListId]: tasks[toDoListId].map((task) =>
    //     task.id === taskId ? { ...task, title: spanTitle } : task,
    //   ),
    // });
    dispatchTasks(ChangeTaskTitleAC(taskId, spanTitle, toDoListId));
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
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: "30px",
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
                  minWidth: 0,
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
