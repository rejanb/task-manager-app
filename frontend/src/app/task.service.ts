import { Injectable } from '@angular/core';
import { Task } from './models/tasks.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebReqService : WebRequestService) { }

  createList(title: string){
    return this.WebReqService.post('lists', { title })  
  }

  getLists(){
    return this.WebReqService.get('lists');
  }  
  getTasks(listId :string){
    return this.WebReqService.get(`lists/${listId}/tasks`)
  }


createTask(title:string, listId:string){
  return this.WebReqService.post(`lists/${listId}/tasks`,{title})

}
 completed(task: Task){
   return this.WebReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{completed:true})
 }

}
