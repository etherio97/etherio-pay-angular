import { Injectable } from "@angular/core";
import { FirebaseApp } from "@firebase/app";
import { Auth, getAuth, User } from "@firebase/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public static app: FirebaseApp;
  public static currentUser: User | null;

  getAuth(): Auth {
    return getAuth(AuthService.app);
  }

  getCurrentUser(): User | null {
    return AuthService.currentUser;
  }
}
