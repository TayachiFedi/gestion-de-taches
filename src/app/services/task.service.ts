import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

export interface Task {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch tasks:', error);
        return of([]);
      })
    );
  }

 
  getTask(id: string): Observable<Task | null> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Task not found:', error);
        return of(null);
      })
    );
  }


  addTask(task: Task): Observable<Task> {
    return this.getTasks().pipe(
      map((tasks) => {
        const ids = tasks.map((t) => parseInt(t.id, 10)); 
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        task.id = (maxId + 1).toString();
        return task;
      }),
      mergeMap((newTask) => this.http.post<Task>(this.apiUrl, newTask))
    );
  }


  updateTask(task: Task): Observable<Task | null> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError((error) => {
        console.error('Failed to update task:', error);
        return of(null); 
      })
    );
  }


  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Failed to delete task:', error);
        return of(); 
      })
    );
  }
}
