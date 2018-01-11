import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, User } from './user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();

  constructor(private _httpService: Http) { }

  post(object) {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(object);
    return this._httpService.post('/api/forum/', body, options);
  }
  count(Id){
      return this._httpService.get('/api/forum/'+ Id);
  }  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  /*
  post(object){
    let headers = new Headers({ 'Content-Type': 
    'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(object);
    return this._httpService.post('/api/forum/', body, options);
  }
  */
  public handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  

}
