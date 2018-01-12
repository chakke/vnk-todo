import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionDetal1Page } from './session-detal1';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    // SessionDetal1Page,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(SessionDetal1Page),
  ],
})
export class SessionDetal1PageModule {}
