import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/task.model'; 
import * as TaskActions from 'src/app/components/store/task.action'

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    error: null,
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
    error: null,
  })),
  on(TaskActions.addTaskFailure, TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
