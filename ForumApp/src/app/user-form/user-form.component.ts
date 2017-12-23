import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
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

  log(x){
    console.log(x);
  }
 
  /*get id(): string {
      return this._id;
  }

  set id(newId: string) {
    this.id = newId;
  }*/
  
  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl()
    });
  }
  onSubmit(){
    if(this.userForm.valid)
      console.log(this.userForm.get('email').value);

      
     return this._httpService.post('api/forum', { email: this.userForm.get('email').value,
     body: 'bar',
     userId: 1})
                                                 .subscribe(
                                                    res => {
                                                      console.log(res);
                                                    },
                                                    err => {
                                                      console.log("Error occured");
                                                    }
                                                  );

    
  }
}
