import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bloodbank } from '../models/bloodbank';
import { Observable } from 'rxjs';
import { environement } from 'src/environment';
import { urls } from 'src/urls';
import { user } from '../models/user';
import { loginuser } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private value: string;
  valueChange = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${urls.userUrl}`);
  }
  getUserById(userid:string):Observable<any>{
    return this.http.get<any>(`${urls.userUrl}/${userid}`)
  }

  addUser(user: user): Observable<user> {
    return this.http.post<user>(`${urls.signupUrl}`, user);
  }

  updateUser(user: user): Observable<user> {
    return this.http.put<user>(`${urls.userUrl}/${user.user_id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${urls.userUrl}/${userId}`);
  }
  loginuser(login: loginuser):Observable<any>{
    return this.http.post<any>(`${urls.loginUrl}`, login);
  }
  setValue(value: string): void {
    this.value = value;
    this.valueChange.emit(this.value);
 }

 getValue(): string {
    return this.value;
 }
 clearValue(): void {
  this.value = null;
  this.valueChange.emit(null);
}
  
}
