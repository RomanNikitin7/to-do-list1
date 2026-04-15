import { type ChangeEvent } from "react";
import type { FilterValues, Task, ToDoListType } from "./App";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChangeEditableSpan={(newTitle) =>
            onChangeTodoListTitle(newTitle, id)
          }
        />
        <Button title="x" onClick={() => deleteTodoList(id)} />
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
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
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChangeEditableSpan={(newTitle) =>
                    onChangeTaskTitle(task.id, newTitle, id)
                  }
                />
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilter("all", id)}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilter("active", id)}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilter("completed", id)}
        />
      </div>
    </div>
  );
};
