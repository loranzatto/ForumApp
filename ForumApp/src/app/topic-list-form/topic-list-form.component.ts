import { Component, OnInit } from '@angular/core';
import { ITopic, Topic } from '../topic-form/topic-form.component';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs/observable/concat';
import { Route } from '@angular/router/src/config';
import { Globals } from '../globals';

@Component({
  selector: 'topic-list-form',
  templateUrl: './topic-list-form.component.html',
  styleUrls: ['./topic-list-form.component.css']
})
export class TopicListFormComponent implements OnInit {

  isREADONLY: boolean = false;

  topicList: Topic[];
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
          display: 'Title',
          variable: 'title',
          filter: 'text'
      },
      {
          display: 'Description',
          variable: 'description',
          filter: 'textarea'
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
              action: 'comment-list-form',
              ishide: this.isREADONLY
          }

      ];

  }
  constructor(private appService:AppService, private toastr: ToastsManager, private router: Router, private globals:Globals) { }

  ngOnInit(){
    this.loadTopics();
  }
  loadTopics(){
    this.topic.ProcessType = 'get';
    this.topic.ClassType = 'Topic'
    this.appService.get(this.topic)
                   .map(response => {return <ITopic[]>response.json()}).catch(this.appService.handleError)
                   .subscribe(resultArray => {
                                                  this.topicList = resultArray;
                                                  console.log(this.topicList);

                                                  if(this.topicList != null){
                                                    console.log(this.topicList.length);
                                                    this.initGridButton();                                                   
                                                  }
                                                  else{
                                                    this.toastr.error('There are no topics found!', 'Failure!')
                                                  };
                                                }, error => console.log("Error :: " + this.appService.handleError));
  }
  gridAction(gridaction: any){
    console.log(gridaction);
    //this.router.navigateByUrl(gridaction.action); 
    console.log(gridaction.values[0].value);
    //this.router.navigate([gridaction.action],)
    this.router.navigate([gridaction.action, { topicId: gridaction.values[0].value }]);

  }

}
