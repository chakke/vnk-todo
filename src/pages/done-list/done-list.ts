import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
/**
 * Generated class for the DoneListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-done-list',
  templateUrl: 'done-list.html',
})
export class DoneListPage {
  array : any = [];

  icons = [
    {
      id: 0,
      url: "assets/icon/icon1.png"
    },
    {
      id: 1,
      url: "assets/icon/icon2.png"
    },
    {
      id: 2,
      url: "assets/icon/icon3.png"
    },
    {
      id: 3,
      url: "assets/icon/icon4.png"
    },
    {
      id: 4,
      url: "assets/icon/icon5.png"
    },
    {
      id: 5,
      url: "assets/icon/icon6.png"
    }

  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoneListPage');
    this.array = this.navParams.data.array;
    console.log(this.array);
    console.log(this.navParams.data.array);
  }

  backPage(){
    this.navCtrl.popToRoot();
  }


}
