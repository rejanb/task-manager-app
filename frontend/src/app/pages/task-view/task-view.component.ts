import { Component, OnInit,NgModule } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/tasks.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
lists:List[];
tasks:Task[];
  constructor(private taskService : TaskService, private route : ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe((params: Params)=>{console.log(params);
         this.taskService.getTasks(params.listId).subscribe((tasks:Task[])=>{
           this.tasks = tasks;

         })}
      
      
     )

      this.taskService.getLists().subscribe((lists: List[])=>{
      this.lists = lists;
      console.log(this.lists)
})
  }
 

  taskComplete(task: Task){
    // have to set the task to completed
    this.taskService.completed(task).subscribe(()=>{
      console.log('completed successfully');
      task.completed=true;
    })
  }


  
  }







