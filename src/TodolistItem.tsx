import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { type ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import type { FilterValues, Task, ToDoListType } from "./app/App";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Typography } from "@mui/material";
import {
  filterButtonsContainerSx,
  getFilterButtonSx,
  getListItemSx,
  todolistTitleSx,
} from "./Todolist.styles";

type Props = {
  id: string;
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string, toDoListId: ToDoListType["id"]) => void;
  changeFilter: (filter: FilterValues, toDoListId: ToDoListType["id"]) => void;
  createTask: (title: string, toDoListId: ToDoListType["id"]) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    toDoListId: ToDoListType["id"],
  ) => void;
  deleteTodoList: (toDoListId: ToDoListType["id"]) => void;
  filter: FilterValues;
  onChangeTodoListTitle: (
    spanTitle: string,
    toDoListId: ToDoListType["id"],
  ) => void;
  onChangeTaskTitle: (
    taskId: string,
    spanTitle: string,
    toDoListId: ToDoListType["id"],
  ) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    id,
    title,
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    filter,
    deleteTodoList,
    onChangeTodoListTitle,
    onChangeTaskTitle,
  } = props;

  const addTaskHandler = (title: string) => {
    createTask(title, id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: 1.5,
        }}
      >
        <Typography component="h3" variant="h6" sx={todolistTitleSx}>
          <EditableSpan
            title={title}
            onChangeEditableSpan={(newTitle) =>
              onChangeTodoListTitle(newTitle, id)
            }
          />
        </Typography>
        <IconButton
          size="small"
          onClick={() => deleteTodoList(id)}
          aria-label="delete todo list"
          sx={{ color: "text.secondary" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <Box
          sx={{
            mt: 1.5,
            mb: 1,
            px: 2,
            py: 2.5,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "background.default",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            No tasks yet
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Add your first task above
          </Typography>
        </Box>
      ) : (
        <List>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id, id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>,
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, id);
            };

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: "0",
                  }}
                >
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    title={task.title}
                    onChangeEditableSpan={(newTitle) =>
                      onChangeTaskTitle(task.id, newTitle, id)
                    }
                  />
                </Box>
                <IconButton
                  className="task-delete"
                  size="small"
                  onClick={deleteTaskHandler}
                  aria-label="delete"
                  sx={{ color: "text.secondary" }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          size="small"
          aria-pressed={filter === "all"}
          sx={getFilterButtonSx(filter === "all")}
          onClick={() => changeFilter("all", id)}
        >
          All
        </Button>
        <Button
          size="small"
          aria-pressed={filter === "active"}
          sx={getFilterButtonSx(filter === "active")}
          onClick={() => changeFilter("active", id)}
        >
          Active
        </Button>
        <Button
          size="small"
          aria-pressed={filter === "completed"}
          sx={getFilterButtonSx(filter === "completed")}
          onClick={() => changeFilter("completed", id)}
        >
          Completed
        </Button>
      </Box>
    </Box>
  );
};
