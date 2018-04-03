import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Category } from '../home/home';
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
  data : String [];
  session: any;
  category : Category;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    for(let category of this.navParams.data.categories){
      if(category && category.id === this.navParams.data.id){
        this.category = category;
        break;
      }
    }

  }

}
