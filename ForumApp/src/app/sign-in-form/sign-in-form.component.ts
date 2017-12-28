import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { User, UserFormComponent, IUser } from '../user-form/user-form.component';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { AppModule } from '../app.module';
import { Globals } from '../globals';

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  
  @ViewChild('template') template:TemplateRef<SignInFormComponent>;  
  
  signInForm: FormGroup; 
  id: FormControl;  
  password: FormControl; 
  modalRef: BsModalRef;
  message: string;

  constructor(private modalService: BsModalService, private appService:AppService, 
              private toastr: ToastsManager, private globals: Globals) {}
  
  createFormControls(){    
    this.id = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);    
  }

  createForm(){
      this.signInForm = new FormGroup({
      id: this.id,
      password: this.password
    })
  }
  
  ngOnInit(){
    this.createFormControls();
    this.createForm();        
  }
  ngAfterViewInit (){
    setTimeout(() => {
      this.openModal(this.template);
    });
  }
  openModal(template) {
    this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';

    if(this.signInForm.valid){
      let user = new User();
      user.Id = this.signInForm.get('id').value;
      user.Password = this.signInForm.get('password').value;
      user.ProcessType = 'get';
      user.ClassType = 'User';
      let retUser:IUser;
      this.appService.get(user)
                     .map(response => {return <IUser>response.json()}).catch(this.appService.handleError)
                     .subscribe(resultArray => {
                                                   retUser = resultArray;
                                                   console.log(retUser);

                                                   if(retUser != null){
                                                     console.log(retUser.id);
                                                     this.globals.sessionId = retUser.id;
                                                     this.toastr.success('Welcome to the IT Forum!', 'Success!')
                                                     this.modalRef.hide();
                                                   }
                                                   else{
                                                    this.signInForm.get('id').setErrors({backend: {}});
                                                    this.signInForm.get('password').setErrors({backend: {}});
                                                    this.toastr.error('Invalid Username/Password!', 'Failure!')
                                                   };
                                                 });
      
    }
  } 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
