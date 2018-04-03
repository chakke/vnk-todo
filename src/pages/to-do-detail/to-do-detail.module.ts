import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToDoDetailPage } from './to-do-detail';

@NgModule({
  declarations: [
    ToDoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ToDoDetailPage),
  ],
})
export class ToDoDetailPageModule {}
