import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private sessionId = new BehaviorSubject<string>("");
  currentSessionId = this.sessionId.asObservable();

  constructor() { }
  
  signIn(userId: string) {
    this.sessionId.next(userId)
  }
  signOut() {
    this.sessionId.next('');
  }

}
