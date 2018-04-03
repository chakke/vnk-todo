import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoneListPage } from './done-list';

@NgModule({
  declarations: [
    DoneListPage,
  ],
  imports: [
    IonicPageModule.forChild(DoneListPage),
  ],
})
export class DoneListPageModule {}
