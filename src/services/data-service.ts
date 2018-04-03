import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Rx";
import { ConferenceDataProvider } from '../providers/conference-data/conference-data';
@Injectable()
export class DataService {

  constructor(public http : Http, public confData: ConferenceDataProvider,) { }
  // createNewData(){
  //   let item = {"data.todoList[0].groups[6].id": 10, "data.todoList[0].groups[6].name" : "khanh", "data.todoList[0].groups[6].description" : "good"};

  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   let body = JSON.stringify(item);
  //   console.log(body);
  //   // console.log(item);
  //   return this.http.post('/assets/data.json', item, options).map((res: Response) => res.json());
    
  // }

  getAll(){
    return this.http.get('assets/data.json').map((res:Response) => res.json());
  }
}