import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detail } from '../../interface/detail';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Category, Session } from '../../pages/home/home';
/*
  Generated class for the ConferenceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConferenceDataProvider {
  data : any;
  info: Detail = {id: 0,  name: '', description: '', date: '', time : '' , icon: '', date_filter:''};
  mCategories : Array<Category> = [];
  // session = new Session();

  constructor(public httpClient: HttpClient, public http : Http, public storage: Storage) {
    console.log('Hello ConferenceDataProvider Provider');
  }
  // Get data from file data.json
  loadData(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      // lay data tu file data.json
      return this.httpClient.get('assets/data.json');
    }
  };

  createNewData(info: Detail){
    this.storage.set('name', this.info.name);
    this.storage.set('description', this.info.description);
    this.storage.set('date', this.info.date);
    this.storage.set('time', this.info.time);
  };

  deleteData(id){
    return this.http.delete('assets/data.json', id);
  };


  getName(name: String): Promise<string> {    
    return this.storage.get(name.toString()).then((value) => {
      return value;
    });
  };

  getDescription(description: String): Promise<string> {    
    return this.storage.get(description.toString()).then((value) => {
      return value;
    });
  };

  loadImg(): any{
    return this.httpClient.get('assets/icon');
  }
  
  //*************************************************************** */
  // Load data from storage to show to screen
  public _LoadData(): any {
    console.log("begin load data");

    this.storage.get("categories").then(val =>{
      if(val){
        // console.log(val);
        console.log("Load data completed",val);
        this.onLoadedData(val);
      }
    })
    
  }
  onLoadedData(val){
    this.mCategories = val;
    // return this.mCategories;
  }


  addCategory(category : Category){
    this.mCategories.push(category);
    console.log(this.mCategories);
    console.log(this.mCategories.length);
    this._SaveData();
    
  }

  public _SaveData(): void {
    this.storage.remove("categories").then(
      () => {
        this.storage.set("categories", this.mCategories);
        console.log("Save data completed");
        
      }
    );
  }

  // formatDate(category: String, session: Session){
  //   switch (this.info.date.substring(5, 7)) {
  //     case "01":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Jan";
  //       break;

  //     case "02":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Feb";
  //       break;

  //     case "03":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Mar";
  //       break;

  //     case "04":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Apr";
  //       break;

  //     case "05":
  //       session.date = this.info.date.substring(8, 10) + "  " + "May";
  //       break;

  //     case "06":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Jun";
  //       break;

  //     case "07":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Jul";
  //       break;

  //     case "08":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Aug";
  //       break;

  //     case "09":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Sep";
  //       break;

  //     case "10":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Oct";
  //       break;

  //     case "11":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Nov";
  //       break;

  //     case "12":
  //       session.date = this.info.date.substring(8, 10) + "  " + "Dec";
  //       break;
  //     default:
  //       break;
  //   }
  // }
};
