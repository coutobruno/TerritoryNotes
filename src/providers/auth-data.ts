import { Injectable } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import firebase from 'firebase';

@Injectable()
export class AuthData {

  fireAuth: any;
  userProfile: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  loginUser (newEmail: string, newPassword: string): any {
    return this.af.auth.login({email: newEmail, password: newPassword});
  }

  resetPassword (email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }
}
