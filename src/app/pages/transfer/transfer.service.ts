import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SERVICE_URL } from 'src/app/app.config';
import { SendTransferDto } from './transfer.model.ts'

@Injectable({
  providedIn: "root",
})
export class TransferService {
  private _findAccountsUrl: string = SERVICE_URL;
  
  private _sendTransferUrl: string = SERVICE_URL.SEND_TRANSFER;
  
  constructor(private http: HttpClient) {}

  findAccounts(identifier: string): Observable<string[]> {
    return this.http.post(this._findAccountsUrl, { identifier });
  }
  
  sendTransfer(sendTransferDto: sendTransferDto) {
    return this.http.post(this._sendTransferUrl, sendTransferDto);
  }
}
