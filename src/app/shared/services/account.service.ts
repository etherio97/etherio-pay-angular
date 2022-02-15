import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount(token: string) {
    return this.http.get<{ balance: number | null; identifier: string }>(
      SERVICE_URL.GET_ACCOUNT,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  startUsingEtherioPay(token: string) {
    return this.http.post<{ balance: number; identifier: string }>(
      SERVICE_URL.GET_ACCOUNT,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getTransfered(token: string) {
    return this.http.get<any[]>(SERVICE_URL.TRAN_TRANSFERED, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getRecieved(token: string) {
    return this.http.get<any[]>(SERVICE_URL.TRAN_RECIEVED, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
