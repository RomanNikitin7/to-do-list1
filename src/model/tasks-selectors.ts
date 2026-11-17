import { TasksTypeArr } from "../app/App";
import { RootState } from "../app/store";

export const selectTasks = (state: RootState): TasksTypeArr => state.tasks;
