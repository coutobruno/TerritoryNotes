import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from "../pages/profile/profile";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { TerritoryDetailPage } from "../pages/territory-detail/territory-detail";
import { TerritoryCreatePage } from "../pages/territory-create/territory-create";
import { ResidentCreatePage } from './../pages/resident-create/resident-create';
import { ResidentDetailPage } from './../pages/resident-detail/resident-detail';
import { ResidentListPage } from './../pages/resident-list/resident-list';
import { VisitCreatePage } from './../pages/visit-create/visit-create';
import { VisitDetailPage } from './../pages/visit-detail/visit-detail';
import { VisitListPage } from './../pages/visit-list/visit-list';

// Import providers
import { AuthData } from "../providers/auth-data";
import { TerritoryData } from "../providers/territory-data";
import { ProfileData } from "../providers/profile-data";

// Importing AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
  const firebaseConfig = {
    apiKey: "AIzaSyD3cyWzuDrzjPi2buFP3zfFgs3mhbRMVxM",
    authDomain: "territorynotes.firebaseapp.com",
    databaseURL: "https://territorynotes.firebaseio.com",
    storageBucket: "territorynotes.appspot.com",
    messagingSenderId: "294820485375"
  };

  const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TerritoryDetailPage,
    TerritoryCreatePage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    ResidentCreatePage,
    ResidentDetailPage,
    ResidentListPage,
    VisitCreatePage,
    VisitDetailPage,
    VisitListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    TerritoryDetailPage,
    TerritoryCreatePage,
    ResetPasswordPage,
    ResidentCreatePage,
    ResidentDetailPage,
    ResidentListPage,
    VisitCreatePage,
    VisitDetailPage,
    VisitListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    TerritoryData,
    ProfileData
  ]
})
export class AppModule {}
