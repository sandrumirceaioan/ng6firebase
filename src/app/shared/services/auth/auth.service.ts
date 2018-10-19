import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase,
    private router: Router
    ) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  emailLogin(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        throw error;
      });
 }

  saveToDb(){
    const itemRef = this.db.object(`users/${this.authState.uid}`);
    itemRef.set({id: this.authState.uid, email: this.authState.email });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }


}
