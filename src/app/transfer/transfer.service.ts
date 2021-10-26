import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransferService {
  private accountIdentifierUrl =
    "https://etherio-pay.herokuapp.com/account/identify";
  constructor(private http: HttpClient) {}

  findUserAccounts(token: string, identifier: string) {
    const headers = {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    return this.http.post(
      this.accountIdentifierUrl,
      { identifier },
      { headers }
    );
  }
}
