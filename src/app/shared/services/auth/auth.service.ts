import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return from(this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
        return value;
    }).catch(err => {
      return err;
    })
    );
  }
  

  setUserDoc(user) {
    return this.afs.doc(`users/${user.uid}`);
  }




}
