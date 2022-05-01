import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private readonly _firestore = getFirestore(getApp());

  getDoc(path: string) {
    return doc(this._firestore, path);
  }

  onSnapshot(ref: any, resolve: any, reject: any) {
    return onSnapshot(ref, resolve, reject);
  }
}
