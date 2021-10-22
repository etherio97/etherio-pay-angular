import { Injectable } from "@angular/core";
import { FirebaseApp, FirebaseOptions, initializeApp } from "@firebase/app";
import { getAuth, User } from "@firebase/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private app: FirebaseApp;
  private config: FirebaseOptions = {
    apiKey: "AIzaSyBLnixFP-rLWHOOEvxC2pjF1ocCrH2qt1A",
    authDomain: "etherio-pay.firebaseapp.com",
    projectId: "etherio-pay",
    messagingSenderId: "927983401567",
    appId: "1:927983401567:web:3323be6b7ee9a37a5fb9ea",
    measurementId: "G-SQ08BEE4GJ",
  };
  private currentUser: Promise<User | null>;

  constructor() {
    this.app = initializeApp(this.config);
    this.currentUser = this.resolveCurrentUser();
  }

  getAuth() {
    return getAuth(this.app);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  private resolveCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      let unsubscribe = this.getAuth().onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      });
    });
  }
}
