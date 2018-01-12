import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
/*
  Generated class for the ConferenceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConferenceDataProvider {
  data : any;
  constructor(public httpClient: HttpClient) {
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
  }
}
