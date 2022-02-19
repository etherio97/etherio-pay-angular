import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { firebaseConfig } from './app.config';
import { AuthService } from './shared/services/auth.service';

export function firebaseInitializer() {
  return async () => {
    AuthService.app = initializeApp(firebaseConfig);
    const onAuthChanged = () =>
      new Promise((resolve: any) =>
        getAuth(AuthService.app).onAuthStateChanged(
          async (user: User | null) => {
            AuthService.currentUser = user;
            AuthService.accessToken = await user?.getIdToken();
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
