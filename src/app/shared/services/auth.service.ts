import { Injectable } from '@angular/core';
import { FirebaseApp } from '@firebase/app';
import {
  Auth,
  getAuth,
  User,
  updateProfile,
  updateEmail,
  updatePassword,
  fetchSignInMethodsForEmail,
} from '@firebase/auth';

@Injectable({
  providedIn: 'root',
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

  fetchSignInMethodsForEmail(email: string) {
    return fetchSignInMethodsForEmail(this.getAuth(), email);
  }

  updateEmail(user: User, email: string) {
    return updateEmail(user, email);
  }

  updatePassword(user: User, password: string) {
    return updatePassword(user, password);
  }

  updateProfile(
    user: User,
    profile: { displayName?: string; photoURL?: string }
  ) {
    return updateProfile(user, profile);
  }
}
