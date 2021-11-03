import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { firebaseConfig } from './app.config';
import { AuthService } from './shared/auth.service';

export function firebaseInitializer() {
  return async () => {
    AuthService.app = initializeApp(firebaseConfig);

    const onAuthChanged = () =>
      new Promise((resolve: any) =>
        getAuth(AuthService.app).onAuthStateChanged((user: User | null) => {
          AuthService.currentUser = user;
          removePreload();
          resolve();
        })
      );

    await onAuthChanged();
  };
}

function removePreload() {
  let el: any = document.querySelector('div#preload');
  if (el instanceof HTMLElement) {
    el.classList.add('opacity-0');
    setTimeout(() => el.remove(), 550);
  }
}
