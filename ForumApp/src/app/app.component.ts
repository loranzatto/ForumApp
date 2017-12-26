import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http'
import { ToastsManager } from 'ng2-toastr';
import {Routes, RouterModule} from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
    constructor(private httpService: Http, private toastr: ToastsManager, private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    apiValues: string[] = [];
    ngOnInit() {
        
    }    
}