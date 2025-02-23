import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly baseUrl = 'http://localhost:8080/api/users';
  
  isLogin = signal<boolean>(false);
  accessRole =signal<'admin'|'user'>('user');
  
    constructor(private http: HttpClient) {}

    login(user:User): Observable<any>{
      return this.http.post(this.baseUrl+"/login",user);
    }

    signUp(user:User): Observable<any>{
      return this.http.post(this.baseUrl,user);
    }

    getUserById(id:number): Observable<any> {
      return this.http.get(this.baseUrl+"/"+id);
    }
    updateUser(user:User): Observable<any>{
      return this.http.put(this.baseUrl,user);
    }

    logout(userId:number){
      return this.http.get<any>(this.baseUrl+"/logout/"+userId);
    }

    isuserActive(userId:number){
      return this.http.get<any>(this.baseUrl+"/isActive/"+userId);
    }

    // validateEmail(email: string){
    //     const params = new HttpParams().set('email', email);
    //     return this.http.get<{data: boolean}>(this.baseUrl+"/isEmailValid",{params})
    //     .pipe(
    //       debounceTime(300), // Add a debounce to avoid frequent API calls.
    //       switchMap((response) => of(response.data ? null : { emailInvalid: true })) // Map the response to an error object or null.
    //     );;
    // }

    validateEmail(email: string):Observable<any>{
      const params = new HttpParams().set('email', email);
      return this.http.get<any>(this.baseUrl+"/isEmailValid",{params});
  }


}
