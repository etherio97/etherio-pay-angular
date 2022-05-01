import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  private readonly $firestore = getFirestore(getApp());
  private readonly $ref = collection(this.$firestore, 'accounts');
  private tracked = false;
  private docRef: any;
  private events: { action: string; handler: Function }[] = [];

  on(action: 'balance', handler: Function) {
    this.events.push({ action, handler });
  }

  trackChanges(uid: string) {
    if (this.tracked) return;
    this.tracked = true;
    this.docRef = doc(this.$firestore, ['accounts', uid].join('/'));
    onSnapshot(
      this.docRef,
      (snap) => {
        try {
          const { action } = snap.data();
          this.events
            .filter((ev) => ev.action === action)
            .forEach((ev) => ev.handler());
        } catch (e) {
          console.warn(e);
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
