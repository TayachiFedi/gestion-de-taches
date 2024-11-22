import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null; 
  errorMessage: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.taskService.getTask(taskId).subscribe({
        next: (task) => {
          if (task) {
            this.task = task;
          } else {
            this.errorMessage = 'Task not found.';
            console.error('Task not found');
          }
        },
        error: (err: any) => {
          if (err.status === 404) {
            this.errorMessage = 'Task not found.';
            console.error('Task not found:', err);
          } else {
            this.errorMessage = 'An error occurred.';
            console.error('Error loading task:', err);
          }
        }
      });
    } else {
      this.errorMessage = 'Invalid task ID.';
    }
  }
}
