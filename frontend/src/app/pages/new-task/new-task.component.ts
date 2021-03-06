import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/tasks.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  listId:string;

  constructor(private taskService : TaskService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
  this.listId = params['listId']
  console.log(this.listId)
    })
  }

  createTask(title:string){
    this.taskService.createTask(title, this.listId).subscribe((newTask:Task)=>{
      this.router.navigate(['../'],{relativeTo:this.route})
      console.log(newTask)
    })
  }

}
