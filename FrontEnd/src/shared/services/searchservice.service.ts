import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bloodbank } from '../models/bloodbank';
import { urls } from 'src/urls';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  constructor(private http: HttpClient) { }
  getsearchedrecords( searchterm:string): Observable<bloodbank[]>{
    return this.http.get<bloodbank[]>(`${urls.searchUrl}/${searchterm}`);

  }

}
