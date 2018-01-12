import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SessionDetal1Page} from '../pages/session-detal1/session-detal1';
import { ConferenceDataProvider } from '../providers/conference-data/conference-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SessionDetal1Page
    // SessionDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SessionDetal1Page
    // SessionDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConferenceDataProvider,
    HttpClientModule,
    HttpModule
  ]
})
export class AppModule {}
