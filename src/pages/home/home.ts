import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';

import { SessionDetal1Page } from '../session-detal1/session-detal1';
import {ConferenceDataProvider} from '../../providers/conference-data/conference-data';

import { List } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
import { Refresher } from 'ionic-angular/components/refresher/refresher';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// @Injectable()
export class HomePage {
  @ViewChild('todoList', { read: List }) todoList: List;
  groups: any = [];
  data: any;

  constructor(
    public navCtrl: NavController,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public confData : ConferenceDataProvider,
    public menuCtrl : MenuController
  ) { }

  ionViewDidLoad() {
    this.todoList && this.todoList.closeSlidingItems();
    this.confData.loadData().subscribe((data: any) => {
      this.groups = data.todoList[0].groups;
      console.log(data.todoList[0].groups);
    })
  }

  // Refresh page
  doRefresh(refresh: Refresher) {
    this.confData.loadData().subscribe((data: any) => {
      this.groups = data.todoList[0].groups;
    })

    setTimeout(() => {
      refresh.complete();

      let toast = this.toastCtrl.create({
        message: "Refresh list done",
        duration: 5000
      })
      toast.present();
    }, 1000);

  }

  // Detail content
  getDetail(sessionData: any){
    this.navCtrl.push(SessionDetal1Page, {sessionId: sessionData.id} );
    // console.log(sessionData);
  }

  add(){
    this.menuCtrl.toggle('left');
    console.log("lol");
  }
}
