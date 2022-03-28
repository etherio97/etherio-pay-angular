import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVICE_URL } from 'src/app/app.config';
import { SendTransferDto } from './transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private _findAccountsUrl: string = SERVICE_URL.FIND_ACCOUNTS;

  private _sendTransferUrl: string = SERVICE_URL.SEND_TRANSFER;

  constructor(private _httpClient: HttpClient) {}

  findAccounts(identifier: string): Observable<string[]> {
    return this._httpClient.post<string[]>(this._findAccountsUrl, {
      identifier,
    });
  }

  sendTransfer(sendTransferDto: SendTransferDto) {
    return this._httpClient.post(this._sendTransferUrl, sendTransferDto);
  }
}
