import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router'
import { AppService } from './app.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap';
import {MatButtonModule} from '@angular/material'


import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HeaderFormComponent } from './header-form/header-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { Globals } from './globals';
import { TopicListFormComponent } from './topic-list-form/topic-list-form.component';
import { DataGrid } from './shared/datagrid/datagrid.component';
import { DataGridUtil } from './shared/datagrid/datagrid.util';
import { Format } from './shared/datagrid/format';
import { OrderBy } from './shared/datagrid/orderby';
import {SearchComponent } from './shared/search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommentListFormComponent } from './comment-list-form/comment-list-form.component';


const routes : Routes = [
  { path: 'comment-list-form', component: CommentListFormComponent},

  { path: 'topic-list-form', component: TopicListFormComponent},
  { path: 'user-form', component: UserFormComponent},
  { path: 'sign-in-form', component: SignInFormComponent},
  { path: 'topic-form', component: TopicFormComponent},
  { path: 'comment-form', component: CommentFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,    
    HeaderFormComponent, 
    SignInFormComponent, TopicFormComponent, CommentFormComponent, TopicListFormComponent,
    DataGrid, Format, OrderBy , SearchComponent, CommentListFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BsDropdownModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'ngx-bootstrap'}),
    ModalModule.forRoot(),
    MatButtonModule,
    MatProgressSpinnerModule
    
  ],
  exports: [
    MatButtonModule
  ],
  entryComponents:[SignInFormComponent],
  providers: [AppService, ToastOptions, BsModalService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
