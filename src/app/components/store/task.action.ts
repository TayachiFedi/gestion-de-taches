import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task List] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task List] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task Form] Add Task',
  props<{ task: Task }>()
);
export const addTaskSuccess = createAction(
  '[Task API] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Task API] Add Task Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task List] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task API] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task API] Delete Task Failure',
  props<{ error: string }>()
);
