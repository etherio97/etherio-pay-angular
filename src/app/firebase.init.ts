import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './app.config';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';

export function firebaseInitializer() {
  return async () => {
    AuthService.app = initializeApp(firebaseConfig);
    const onAuthChanged = () =>
      new Promise((resolve: any) =>
        getAuth(AuthService.app).onAuthStateChanged(
          async (user: User | null) => {
            AuthService.currentUser = user;
            AuthService.accessToken = user ? await user.getIdToken() : null;
            resolve();
          }
        )
      );

    if (environment.production) {
      getAnalytics();
    }

    await onAuthChanged();
  };
}
