import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { User, UserFormComponent, IUser } from '../user-form/user-form.component';
import { AppService } from '../app.service';
import { ToastsManager } from 'ng2-toastr';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
              private toastr: ToastsManager, private authService: AuthService, private router: Router) {}
  
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

      let retUser:IUser;
      this.appService.post('user/get', user)
                     .map(response => {return <IUser>response.json()}).catch(this.appService.handleError)
                     .subscribe(resultArray => {
                                                  retUser = resultArray;

                                                  if(retUser != null){
                                                    this.authService.signIn(retUser.id);
                                                    this.toastr.success('Welcome ' + retUser.id + '!', 'Sign In!')
                                                    this.modalRef.hide();
                                                    this.router.navigate(['topic-list-form']);
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
    this.modalRef.hide();
    this.router.navigate(['topic-list-form']);
  }
}
