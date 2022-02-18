import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount() {
    return this.http.get<{ balance: number | null; identifier: string }>(
      SERVICE_URL.GET_ACCOUNT
    );
  }

  startUsingEtherioPay() {
    return this.http.post<{ balance: number; identifier: string }>(
      SERVICE_URL.GET_ACCOUNT,
      null
    );
  }

  getTransfered() {
    return this.http.get<any[]>(SERVICE_URL.TRAN_TRANSFERED);
  }

  getRecieved() {
    return this.http.get<any[]>(SERVICE_URL.TRAN_RECIEVED);
  }
}
