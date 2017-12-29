import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { Globals } from '../globals';
import { Comment, IComment } from '../comment-form/comment-form.component';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'comment-list-form',
  templateUrl: './comment-list-form.component.html',
  styleUrls: ['./comment-list-form.component.css']
})
export class CommentListFormComponent implements OnInit {

  
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
          display: 'Opened By',
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
  
  constructor(private appService:AppService, private toastr: ToastsManager, private globals:Globals, 
              private route: ActivatedRoute, private modalService: BsModalService){
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
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  loadComments(topicId){
  this.comment.ProcessType = 'get';
  this.comment.ClassType = 'Comment';
  this.comment.TopicId = topicId;
  this.appService.get(this.comment)
                  .map(response => {return <IComment[]>response.json()}).catch(this.appService.handleError)
                  .subscribe(resultArray => {
                                                console.log(this.commentList);
                                                console.log(this.commentList);

                                                this.commentList = resultArray;
                                                console.log(this.commentList);

                                                if(this.commentList != null){
                                                  console.log(this.commentList.length);
                                                  //this.initGridButton();                                                   
                                                }
                                                else{
                                                  this.toastr.error('There are no topics found!', 'Failure!')
                                                };
                                              }, error => console.log("Error :: " + error));
  }
  async onSubmit(){

    if(this.commentForm.valid){
      let comment = new Comment();
      comment.Description = this.commentForm.get('commentDescription').value;
      console.log(comment.Description);
      comment.TopicId = this.topicId;
      comment.UserId = this.globals.sessionId; 
      console.log(comment.UserId); 
      comment.ClassType = "Comment"; 
      comment.ProcessType = "Add";
      comment.CreationDate = null;
      comment.UpdateDate = null;      
      
      this.appService.add(comment).toPromise().then().catch();
      this.toastr.success('Successfully added comment.', 'Success!');
      this.commentForm.reset();            
    }
  }
  gridAction(){

  }

}
