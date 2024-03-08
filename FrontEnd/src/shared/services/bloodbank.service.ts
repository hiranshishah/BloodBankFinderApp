import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bloodbank } from '../models/bloodbank';
import { BehaviorSubject, Observable } from 'rxjs';
import { urls } from 'src/urls';
import { BloodbankModule } from 'src/bloodbank/bloodbank.module';
@Injectable({
  providedIn: 'root'
})
export class BloodbankService {

  constructor(private http: HttpClient) { }

  getBloodBanks(): Observable<bloodbank[]> {
    return this.http.get<bloodbank[]>(`${urls.bloodbankUrl}`);
  }
  getbloodbankbyid(bloodbankid:string):Observable<bloodbank> {
    return this.http.get<bloodbank>(`${urls.bloodbankUrl}/${bloodbankid}`);
  }
  addBloodBank(bloodBank: bloodbank): Observable<bloodbank[]> {
    return this.http.post<bloodbank[]>(`${urls.bloodbankUrl}`, bloodBank);
  }

  deleteBloodBank(bloodBankId: string): Observable<bloodbank[]> {
    return this.http.delete<bloodbank[]>(`${urls.bloodbankUrl}/${bloodBankId}`);
  }

  updateBloodBank(bloodbankid:string,bloodBank: bloodbank): Observable<bloodbank> {
    return this.http.put<bloodbank>(`${urls.bloodbankUrl}/${bloodbankid}`, bloodBank,{headers: {'Content-Type':'application/json'}});
  }

 
}

