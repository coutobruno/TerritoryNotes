import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import {AngularFire} from "angularfire2";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform, af: AngularFire) {

    const authListener = af.auth.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authListener.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authListener.unsubscribe();
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
