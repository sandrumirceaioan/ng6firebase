import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
        this.saveToDb(value.user);
        return value;
    }).catch(err => {
      return err;
    })
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      return value;
    }).catch(err => {
      return err;
    })
  }

  saveToDb(user){
    const itemRef = this.db.object(`users/${user.uid}`);
    itemRef.set({id: user.uid, email: user.email });
  }


}
