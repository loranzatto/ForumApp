import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppComponent } from '../app.component';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { AppService} from '../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
//import { FormControl } from '@angular/forms/src/model';
//import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup; 
  id: FormControl;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  submitPending: boolean;
  _users: IUser[];

  constructor(private appService:AppService, private toastr: ToastsManager){
  }
  
  createFormControls(){    
    this.id = new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
    this.name = new FormControl('',[Validators.required, Validators.maxLength(70)]);
    this.email = new FormControl('',[Validators.required, Validators.maxLength(100), Validators.pattern("[^ @]*@[^ @]*")]);
    this.password = new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]);    
  }
  createForm(){
    this.userForm = new FormGroup({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    })
  } 
  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }
  onSubmit(){
    
    if(this.userForm.valid){
      let user = new User();
      user.Id = this.userForm.get('id').value;
      user.Name = this.userForm.get('name').value;
      user.Email = this.userForm.get('email').value;
      user.Password = this.userForm.get('password').value;
      user.CreationDate = null;
      user.UpdateDate = null;
      
      let count;
      //this.appService.get().subscribe(res => count = res.text());
      this.appService.getPosts().subscribe(resultArray => {this._users = resultArray;
                                                           console.log(this._users)
                                                          }, error => console.log("Error :: " + error));

      //if(count > 0){
      //console.log(this._users);
      //}
      
      this.submitPending = true;
      this.appService.add(user).toPromise().then(data => {}).catch();

      this.toastr.success('Successfully added user.', 'Success!');   
      this.submitPending = false;

      this.userForm.reset();
    }     
  }
}
class User{
  Id: string;
  Name: string;
  Email: string;
  Password: string;
  CreationDate: Date;
  UpdateDate: Date;

  constructor(){}
 
}

export interface IUser{
  Id: string;
  Name: string;
  Email: string;
  Password: string;
  CreationDate: Date;
  UpdateDate: Date; 
}