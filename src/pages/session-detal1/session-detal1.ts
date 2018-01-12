import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
import {ConferenceDataProvider} from '../../providers/conference-data/conference-data';
/**
 * Generated class for the SessionDetal1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-session-detal1',
  templateUrl: 'session-detal1.html',
})
export class SessionDetal1Page {
  session: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData : ConferenceDataProvider ) {
  }

  ionViewDidLoad() {
    console.log("start");
    this.confData.loadData().subscribe((data: any) => {
      if(data && data.todoList && data.todoList[0] && data.todoList[0].groups){
        console.log("data");
        for(let group of data.todoList[0].groups){
          if(group && group.sessions){
            console.log("group");
            for(let session of group.sessions){
              if(session && session.id === this.navParams.data.sessionId){
                
                this.session = session;
                console.log(this.session.name);
                break;
              }
            }
          }
        }
      }

    })
    
  }

}
