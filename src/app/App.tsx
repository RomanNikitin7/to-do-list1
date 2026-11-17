import "./App.css";
import { TodolistItem } from "../TodolistItem";
import { AddItemForm } from "../AddItemForm";
import { ButtonAppBar } from "../ButtonAppBar";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../common/theme/theme";
import {
  createTodoListAC,
  deleteTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
} from "../model/todolist-reducer";
import {
  createTaskAC,
  deleteTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from "../model/tasks-reducer";
import { selectTasks } from "../model/tasks-selectors";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { selectTodolists } from "../model/todolists-selectors";

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
  const toDoLists = useAppSelector(selectTodolists);

  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  const deleteTask = (taskId: string, toDoListId: string) => {
    dispatch(deleteTaskAC({ taskId, toDoListId }));
  };

  const createTask = (title: string, toDoListId: string) => {
    dispatch(createTaskAC({ title, toDoListId }));
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    toDoListId: string,
  ) => {
    dispatch(changeTaskStatusAC({ taskId, isDone, toDoListId }));
  };

  const changeTodoListFilter = (filter: FilterValues, toDoListId: string) => {
    dispatch(changeTodoListFilterAC({ filter, id: toDoListId }));
  };

  const deleteTodoList = (toDoListId: string) => {
    dispatch(deleteTodoListAC({ id: toDoListId }));
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
    dispatch(createTodoListAC(todoListTitle));
  };

  const handleChangeTodoListTitle = (spanTitle: string, toDoListId: string) => {
    dispatch(changeTodoListTitleAC({ title: spanTitle, id: toDoListId }));
  };

  const handleChangeTaskTitle = (
    taskId: string,
    spanTitle: string,
    toDoListId: string,
  ) => {
    dispatch(changeTaskTitleAC({ taskId, spanTitle, toDoListId }));
  };
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ButtonAppBar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container sx={{ mb: 6, justifyContent: "center" }}>
            <Paper
              sx={{
                p: 1.5,
                width: "100%",
                maxWidth: "600px",
                borderRadius: "14px",
              }}
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
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  boxShadow: "0 1px 2px rgba(27, 35, 51, 0.06), 0 8px 24px -12px rgba(27, 35, 51, 0.18)",
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
