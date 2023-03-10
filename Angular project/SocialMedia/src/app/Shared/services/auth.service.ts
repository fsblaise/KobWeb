import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {getAuth, sendPasswordResetEmail,} from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  newpass(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("email send to " + email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  loginWithPhone(phoneNumber: any, reCaptchaVerifier: any) {
    return firebase.auth().signInWithPhoneNumber(phoneNumber, reCaptchaVerifier);
  }

  loginWithCred(cred: firebase.auth.AuthCredential){
    return firebase.auth().signInWithCredential(cred);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  currentuser() {
    return this.auth.currentUser;
  }
}
