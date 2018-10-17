import { Component, OnInit } from '@angular/core';
import { ITopic, Topic } from '../topic-form/topic-form.component';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { concat } from 'rxjs/observable/concat';
import { Route } from '@angular/router/src/config';
import { setDefaultService } from 'selenium-webdriver/edge';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'topic-list-form',
  templateUrl: './topic-list-form.component.html',
  styleUrls: ['./topic-list-form.component.css']
})
export class TopicListFormComponent implements OnInit {

  isREADONLY: boolean = false;

  topicList: Topic[];
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
      column: 'id',
      descending: true
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
  constructor(private appService:AppService, private toastr: ToastsManager, 
              private router: Router, private authService:AuthService) { 

  }  
  async ngOnInit(){
    await new Promise(resolve => {this.appService.currentMessage.subscribe(message => this.loadTopics(message.toString())); resolve()}); 
    this.appService.changeMessage(""); 
  }
  
  async loadTopics(topicDescription:string){

    console.log(topicDescription);
    
    let urlName = topicDescription.length > 0 ? 'topic/GetByDescription' : 'topic/GetAll';    
                                                        
    await new Promise(resolve => {this.appService.post(urlName, topicDescription)
                                                 .map(response => {return <ITopic[]>response.json()}).catch(this.appService.handleError)
                                                 .subscribe(resultArray => {
                                                                             this.topicList = resultArray;

                                                                             if(this.topicList != null){
                                                                               this.initGridButton();                                                   
                                                                             }
                                                                             else{
                                                                               this.toastr.error('There are no topics found!', 'Failure!')
                                                                             };
                                                                             resolve();
                                                                            }, error => console.log("Error :: " + this.appService.handleError));
                                 });
  }
  gridAction(gridaction: any){
    this.router.navigate([gridaction.action, { topicId: gridaction.values[0].value }]);
  }

}
