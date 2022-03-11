import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { SERVICE_URL } from 'src/app/app.config';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class BalanceService {
  private _balance: number | null = null;
  private _balance$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(this._balance);

  constructor(private http: HttpClient) {}

  reload() {
    return this.http.get(SERVICE_URL.GET_ACCOUNT).pipe(
      switchMap((data: any) => {
        this._balance$.next(data?.balance);
        return this._balance$.asObservable();
      })
    );
  }

  get() {
    return this._balance$.asObservable();
  }
}
