import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/task.model'; 
import * as TaskActions from 'src/app/components/store/task.action'
import { TaskState } from '../store/task.reducer'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>; 

  constructor(private store: Store<{ tasks: TaskState }>) {

    this.tasks$ = this.store.select((state) => state.tasks.tasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks()); 
  }

  deleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id })); 
  }
}
