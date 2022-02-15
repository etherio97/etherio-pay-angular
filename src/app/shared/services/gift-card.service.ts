import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../../app.config';

export interface GiftCardPackageResponse {
  id: string;
  title: string;
  image: string;
}

export interface GiftCardResponse {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class GiftCardService {
  constructor(private http: HttpClient) {}

  getAllPackages(token: string) {
    return this.http.get<GiftCardPackageResponse[]>(
      SERVICE_URL.GET_ALL_PACKAGES,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAll(id: string, token: string) {
    return this.http.get<GiftCardResponse[]>(
      `${SERVICE_URL.GET_PACKAGE}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
