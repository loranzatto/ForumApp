import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppComponent } from '../app.component';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { AppService} from '../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../user-form/user-form.component';
import { AppModule } from '../app.module';
import { AuthService } from '../auth.service';

@Component({
  selector: 'topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  topicForm: FormGroup; 
  title: FormControl;
  description: FormControl;

  constructor(private appService:AppService, private toastr: ToastsManager, private authService:AuthService){ }
  
  createFormControls(){    
    this.title = new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
    this.description = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]);       
  }
  createForm(){
    this.topicForm = new FormGroup({
      title: this.title,
      description: this.description
    })
  } 
  ngOnInit() {
    this.createFormControls()
    this.createForm()
  } 
  async onSubmit(){
    
    if(this.topicForm.valid){
      let topic = new Topic();
      topic.Title = this.topicForm.get('title').value;
      topic.Description = this.topicForm.get('description').value;
      this.authService.currentSessionId.subscribe(sessionId => topic.UserId = sessionId);        
      topic.ClassType = "Topic";    
      topic.CreationDate = new Date();
            
      this.appService.post('topic/Insert', topic).toPromise().then().catch();
      this.toastr.success('Topic added successfully.', 'Success!');
      this.topicForm.reset();
            
    }         
  } 
}
export class Topic{
  Id: number;
  Title: string;
  Description: string;    
  CreationDate: Date;
  UpdateDate: Date;
  UserId: string;
  User: User;
  ProcessType: string;
  ClassType: string;

  constructor(){}
 
}
export interface ITopic{
  id: number;
  title: string;
  description: string;    
  creationDate: Date;
  updateDate: Date;
  userId: string;
  user: User;
  classType: string;
  processType: string;
 
}