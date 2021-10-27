import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount(token: string) {
    return this.http.get<{ balance: number; identifier: string }>(
      "https://etherio-pay.herokuapp.com/account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getTransfered(token: string) {
    return this.http.get<any[]>(
      "https://etherio-pay.herokuapp.com/transaction/transfered",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getRecieved(token: string) {
    return this.http.get<any[]>(
      "https://etherio-pay.herokuapp.com/transaction/recieved",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
