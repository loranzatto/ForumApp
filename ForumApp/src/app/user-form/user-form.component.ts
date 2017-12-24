import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/Rx';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';


//import { FormControl } from '@angular/forms/src/model';
//import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;  
  constructor(private _httpService: Http) {
  }
  Add(model) {
    let headers = new Headers({ 'Content-Type': 
    'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    delete model["id"];
    let body = JSON.stringify(model);
    console.log(body);
    return this._httpService.post('/api/forum/', body, 
           options).toPromise().catch();
  }
  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl()
    });
  }
  onSubmit(){
     let user = new User();
     user.Id = this.userForm.get('id').value;
     user.Name = this.userForm.get('name').value;
     user.Email = this.userForm.get('email').value;
     user.Password = this.userForm.get('password').value;
     user.CreationDate = null;
     user.UpdateDate = null;
     
     this.Add(user).then(data => {})
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
