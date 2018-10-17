import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../auth.service';
import { Comment, IComment } from '../comment-form/comment-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Topic, ITopic } from '../topic-form/topic-form.component';

@Component({
  selector: 'comment-list-form',
  templateUrl: './comment-list-form.component.html',
  styleUrls: ['./comment-list-form.component.css']
})
export class CommentListFormComponent implements OnInit {

  @ViewChild('template') template:TemplateRef<CommentListFormComponent>;  

  commentListForm: FormGroup; 
  commentForm: FormGroup; 
  commentDescription: FormControl;
  topicDescription: FormControl;
  topicTitle: FormControl;
  topicId: number;
  modalRef: BsModalRef;

  isREADONLY: boolean = false;

  commentList: Comment[];
  comment: Comment = new Comment();
  topic: Topic = new Topic();

  msg: string;
  modalTitle: string;
  modalBtnTitle: string;

  //Grid Vars start
  columns: any[] = [
      {
          display: 'Id',
          variable: 'id',
          filter: 'text',
      },     
      {
          display: 'Description',
          variable: 'description',
          filter: 'textarea'
      },
      {
          display: 'Topic Id',
          variable: 'topicId',
          filter: 'text'
      },
      {
          display: 'Opened By',
          variable: 'userId',
          filter: 'text'
      },
      {
          display: 'Creation Date',
          variable: 'creationDate',
          filter: 'date'
      }
  ];
  sorting: any = {
      column: 'Id',
      descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  
  initGridButton() {

      
      this.gridbtns = [
          {
            title: 'Details / Comments',
            keys: ['id'],
            action: '/comment-list-form',
            ishide: this.isREADONLY
              
          }

      ];

  }
  
  constructor(private appService:AppService, private toastr: ToastsManager, private authService:AuthService, 
              private route: ActivatedRoute, private modalService: BsModalService, private router: Router){
    this.route.params.subscribe(params => { this.topicId = params['topicId'] });
   }
  
  createFormControls(){   
    this.topicTitle = new FormControl();
    this.topicDescription = new FormControl(); 
    this.commentDescription = new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(1000)]);       
      
  }
  createForm(){
    this.commentListForm = new FormGroup({
      topicTitle: this.topicTitle,
      topicDescription: this.topicDescription,
    });
    this.commentForm = new FormGroup({
      commentDescription: this.commentDescription
    })

  } 
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.loadComments(this.topicId);
  } 
  openModal(template) {
    let tempSessionId: string;
    this.authService.currentSessionId.subscribe(sessionId => tempSessionId = sessionId)
    if(tempSessionId.length > 0){
      this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
      this.commentForm.get('commentDescription').setValue('');
    }else{
      this.toastr.error('To add a comment please sign in!', 'Failure!');
    }    
  }
  async loadComments(topicId){  
 
    await new Promise(resolve => {this.appService.post('topic/GetById', topicId)
                                                  .map(response => {return <ITopic[]>response.json()}).catch(this.appService.handleError)
                                                  .subscribe(resultArray => {   
                                                                                let topicResult: ITopic;                                              
                                                                                topicResult = resultArray;

                                                                                if(topicResult != null){
                                                                                  this.commentListForm.get('topicTitle').setValue(topicResult.title);
                                                                                  this.commentListForm.get('topicDescription').setValue(topicResult.description);
                                                                                }
                                                                                else{
                                                                                  this.toastr.error('There are no topics found!', 'Failure!')
                                                                                };
                                                                                resolve();
                                                                              }, error => console.log("Error :: " + error));
                                  });
    await new Promise(resolve => {this.appService.post('comment/GetByTopic', topicId)
                                                 .map(response => {return <IComment[]>response.json()}).catch(this.appService.handleError)
                                                 .subscribe(resultArray => {
                                                                              this.commentList = resultArray;

                                                                              if(this.commentList == null){
                                                                                this.toastr.error('There are no comments found!', 'Failure!')
                                                                              };
                                                                              resolve();
                                                                            }, error => console.log("Error :: " + error));
                                  });
  }
  async onSubmit(){

    if(this.commentForm.valid){
      let comment = new Comment();
      comment.Description = this.commentForm.get('commentDescription').value;
      comment.TopicId = this.topicId;
      console.log(this.topicId);
      this.authService.currentSessionId.subscribe(sessionId => comment.UserId = sessionId);
      comment.CreationDate = new Date();          
      
      await new Promise(resolve => {this.appService.post('comment', comment).toPromise().then(data => {resolve()}).catch()});
      console.log("commented inserted");
      this.toastr.success('Comment added successfully.', 'Success!');
      this.modalRef.hide();
      await this.loadComments(this.topicId);                             
    }
  }
}
