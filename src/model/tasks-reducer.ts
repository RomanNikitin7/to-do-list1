import { v1 } from "uuid";
import { TasksTypeArr } from "../App";

const startState = {};

type CreateTaskAction = {
  type: "create_task";
  payload: {
    title: string;
    toDoListId: string;
  };
};

type CreateTodoListAction = {
  type: "create_todolist";
  payload: {
    todoListId: string;
  };
};

type DeleteTodoListAction = {
  type: "delete_todolist";
  payload: {
    todoListId: string;
  };
};

type DeleteTaskAction = {
  type: "delete_task";
  payload: {
    taskId: string;
    toDoListId: string;
  };
};

type ChangeTaskStatusAction = {
  type: "change_task_status";
  payload: {
    taskId: string;
    isDone: boolean;
    toDoListId: string;
  };
};

type ChangeTaskTitleAction = {
  type: "change_task_title";
  payload: {
    taskId: string;
    spanTitle: string;
    toDoListId: string;
  };
};

type Actions =
  | CreateTaskAction
  | CreateTodoListAction
  | DeleteTodoListAction
  | DeleteTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction;

export const tasksReducer = (
  state: TasksTypeArr = startState,
  action: Actions,
): TasksTypeArr => {
  switch (action.type) {
    case "create_task": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.toDoListId]: [
          newTask,
          ...(state[action.payload.toDoListId] || []),
        ],
      };
    }

    case "create_todolist": {
      return { ...state, [action.payload.todoListId]: [] };
    }

    case "delete_todolist": {
      let copyTasks = { ...state };
      delete copyTasks[action.payload.todoListId];
      return copyTasks;
    }

    case "delete_task": {
      return {
        ...state,
        [action.payload.toDoListId]: state[action.payload.toDoListId].filter(
          (task) => action.payload.taskId !== task["id"],
        ),
      };
    }

    case "change_task_status": {
      return {
        ...state,
        [action.payload.toDoListId]: state[action.payload.toDoListId].map(
          (task) =>
            task.id === action.payload.taskId
              ? { ...task, isDone: action.payload.isDone }
              : task,
        ),
      };
    }

    case "change_task_title": {
      return {
        ...state,
        [action.payload.toDoListId]: state[action.payload.toDoListId].map(
          (task) =>
            task.id === action.payload.taskId
              ? { ...task, title: action.payload.spanTitle }
              : task,
        ),
      };
    }

    default:
      return state;
  }
};

export const CreateTaskAC = (title: string, toDoListId: string) => {
  return {
    type: "create_task",
    payload: {
      title,
      toDoListId,
    },
  } as const;
};

export const CreateTodoListAC = (todoListId: string) => {
  return {
    type: "create_todolist",
    payload: {
      todoListId,
    },
  } as const;
};

export const DeleteTodoListAC = (todoListId: string) => {
  return {
    type: "delete_todolist",
    payload: {
      todoListId,
    },
  } as const;
};

export const DeleteTaskAC = (taskId: string, toDoListId: string) => {
  return {
    type: "delete_task",
    payload: {
      taskId,
      toDoListId,
    },
  } as const;
};

export const ChangeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  toDoListId: string,
) => {
  return {
    type: "change_task_status",
    payload: {
      taskId,
      isDone,
      toDoListId,
    },
  } as const;
};

export const ChangeTaskTitleAC = (
  taskId: string,
  spanTitle: string,
  toDoListId: string,
) => {
  return {
    type: "change_task_title",
    payload: {
      taskId,
      spanTitle,
      toDoListId,
    },
  } as const;
};
