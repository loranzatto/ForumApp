import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { TopicListFormComponent } from '../topic-list-form/topic-list-form.component';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css']
})
export class HeaderFormComponent implements OnInit {

  headerForm: FormGroup; 
  search: FormControl;
  private isAuthenticated = false; 
  private userId: string; 

  constructor(private router: Router, private appService: AppService, 
              private toastr: ToastsManager, private authService: AuthService) {
    this.authService.currentSessionId.subscribe(message => {
                                                              this.isAuthenticated = message.length > 0 ? true : false;
                                                              this.userId = message;
                                                              console.log(this.isAuthenticated);
                                                           });
   }

  
  createFormControls(){    
    this.search = new FormControl();       
  }
  createForm(){
    this.headerForm = new FormGroup({
      search: this.search
    })
  } 
  doSearch(event){
    if (event.keyCode == 13){
      this.appService.changeMessage(this.headerForm.get('search').value);
      this.router.navigate(['topic-list-form']);
    }
  }
  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }
  signOut(){
    this.userId = '';
    this.authService.signOut();
    this.toastr.warning('You are logged out! Please do not stay away so long!', 'Sign Out!');
    this.router.navigate(['topic-list-form']);
  }

}
