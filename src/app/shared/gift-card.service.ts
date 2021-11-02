import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
  providedIn: "root",
})
export class GiftCardService {
  private GET_PACKAGE = "http://localhost:3000/gift-cards";
  private GET_ALL_PACKAGES = "http://localhost:3000/gift-cards/all";

  constructor(private http: HttpClient) {}

  getAllPackages(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<GiftCardPackageResponse[]>(this.GET_ALL_PACKAGES, {
      headers,
    });
  }

  getAll(id: string, token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<GiftCardResponse[]>(`${this.GET_PACKAGE}/${id}`, {
      headers,
    });
  }
}
