import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { Globals } from '../globals';
import { Topic } from '../topic-form/topic-form.component';
import { User } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @ViewChild('template') template:TemplateRef<CommentFormComponent>;  

  commentForm: FormGroup; 
  description: FormControl;
  topicId: number;
  userId: string;
  modalRef: BsModalRef;
  
  constructor(private appService:AppService,private modalService: BsModalService,
              private toastr: ToastsManager, private globals:Globals, private router: Router){ }
  
  createFormControls(){    
    this.description = new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(1000)]);       
  }
  createForm(){
    this.commentForm = new FormGroup({
      description: this.description
    })
  } 
  ngOnInit() {
    this.createFormControls()
    this.createForm()
  } 
  openModal(template) {
    this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
  }
  async onSubmit(){
    
    if(this.commentForm.valid){
      let comment = new Comment();
      comment.Description = this.commentForm.get('description').value;
      console.log(this.globals.sessionId);
      comment.TopicId = this.topicId;
      comment.UserId = this.globals.sessionId;  
      comment.ClassType = "Comment"; 
      comment.ProcessType = "Add";
      comment.CreationDate = null;
      comment.UpdateDate = null;      
      
      this.appService.add(comment).toPromise().then().catch();
      this.toastr.success('Successfully added comment.', 'Success!');
      this.commentForm.reset();
      this.modalRef.hide();
      this.router.navigate(['comment-list-form']);
    }
  }         

}
export class Comment{
  Id: number;
  Description: string;    
  CreationDate: Date;
  UpdateDate: Date;
  UserId: string;
  TopicId: number;
  Topic: Topic;
  //User: User;
  ProcessType: string;
  ClassType: string;

  constructor(){}
 
}
export interface IComment{
  id: number;
  description: string;    
  creationDate: Date;
  updateDate: Date;
  topicId: number;
  userId: string;
  topic: Topic;
  //user: User;
  classType: string;
  processType: string;
 
}