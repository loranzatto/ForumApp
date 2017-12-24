import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './user-form/user-form.component';

@Injectable()
export class AppService {

  constructor(private _httpService: Http) { }

   add(object) {
    let headers = new Headers({ 'Content-Type': 
    'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(object);
    console.log(body);
    return this._httpService.post('/api/forum/', body, options);
  }
 
  getPosts(): Observable<IUser[]> {
    return this._httpService
        .get('/api/forum/')
        .map(response => {return <IUser[]>response.json()}).catch(this.handleError);
  }
  get() {    
    
    return this._httpService.get('/api/forum/');
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

}
