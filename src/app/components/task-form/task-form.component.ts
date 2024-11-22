import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  isEditMode = false;
  task: Task = { id: '', name: '', description: '' }; // Initialize task object

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.taskService.getTask(taskId).subscribe({
        next: (task) => {
          if (task) {
            this.task = task;
          }
        },
        error: (err) => console.error('Error loading task:', err),
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Update Task
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          console.log('Task updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating task:', err),
      });
    } else {
      // Create New Task
      this.taskService.addTask(this.task).subscribe({
        next: () => {
          console.log('Task created successfully');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating task:', err),
      });
    }
  }
}
