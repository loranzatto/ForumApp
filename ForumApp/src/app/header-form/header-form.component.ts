import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.css']
})
export class HeaderFormComponent implements OnInit {

  headerForm: FormGroup; 
  search: FormControl;
  

  constructor(private router: Router) { }

  
  createFormControls(){    
    this.search = new FormControl();       
  }
  createForm(){
    this.headerForm = new FormGroup({
      search: this.search
    })
  } 
  doSearch(event){
    console.log('enter 1');
    console.log(event.keypress);

    if (event.keypress == 13){//if enter then hit the search button
      console.log('enter 2');
      this.router.navigate(['topic-list-from', {topicDescription: this.search}]);
    }
  }
  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }

}
