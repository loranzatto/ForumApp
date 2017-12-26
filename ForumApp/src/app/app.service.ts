import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser, User } from './user-form/user-form.component';

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
 /*
  get(Id :string): Observable<IUser[]> {
    let headers = new Headers({ 'Content-Type': 
    'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    //let searchParams = new URLSearchParams();
    //searchParams.set('Id', Id);
    console.log('/api/forum/'+Id, options);
    //return this._httpService
    //    .get('/api/forum/'+ Id)
    //    .map(response => {return <IUser[]>response.json()}).catch(this.handleError);
  } 
  */
  count(Id){
      return this._httpService.get('/api/forum/'+ Id);
  }
 

}
