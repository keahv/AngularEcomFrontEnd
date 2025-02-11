import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly baseUrl = 'http://localhost:8080/api/users';
  
    constructor(private http: HttpClient) {}

    login(user:User): Observable<any>{
      return this.http.post(this.baseUrl+"/login",user);
    }

    signUp(user:User): Observable<any>{
      return this.http.post(this.baseUrl,user);
    }

    updateUser(user:User): Observable<any>{
      return this.http.put(this.baseUrl,user);
    }
}
