import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams ,ViewController} from 'ionic-angular';
import { HomePage, Session, Category } from '../home/home';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { ConferenceDataProvider } from '../../providers/conference-data/conference-data';

@IonicPage()
@Component({
  selector: 'page-to-do-detail',
  templateUrl: 'to-do-detail.html',
})
export class ToDoDetailPage {
  mCategory : Category = new Category();
  mSession : Session = new Session();

  item : Category = this.navParams.get("todo");
  session : Session = this.navParams.get("session");
  doneCategories: Array<Category> = [];
  mCategories: Array<Category> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mViewController : ViewController,
    public storage : Storage,
    public appCtrl: App
  ) {

    this.mCategories = this.navParams.get("array");
    console.log("category detail page : " , this.mCategories);
    if(this.item && this.session){
      this.mCategory = this.item;
      this.mSession = this.session;
      console.log("item ", this.mCategory);
    }else{
      console.log(this.item);      
    } 
  }

  ionViewDidLoad() {
    this._LoadDoneData();
    // this.onClickDismiss();
  }

  public _LoadDoneData(): any {
    this.storage.get("doneCategories").then(val => {
      console.log(val);
      
      this.onLoadedDoneData(val);
    })
  }

  onLoadedDoneData(val) {
    if (val) {
      this.doneCategories = val;
      console.log("home donecategorites",this.doneCategories);
    }else{
      this.doneCategories = [];
    }
    
  }

  onClickDismiss(){
    this.mViewController.dismiss({
      
    },"",{
      animate : false
    });
  }

  addToDoneList(){
    // this.item.addSession(this.session);
    this.addCategory(this.mCategory);
    this.onClickDismiss();
  }

  public addCategory(category: Category) {
    let index = this.mCategories.indexOf(category);    
    if (index != -1){
      this.doneCategories.push(category);
      
      this.mCategories.splice(index, 1);
    }
    this._SaveDoneData();
    console.log("done category detail page ", this.doneCategories);
    this._SaveData();
    //   this.navCtrl.push('DoneListPage', { array: this.doneCategories });
  }

  public _SaveDoneData(): void {
    this.storage.remove("doneCategories").then(
      () => {
        this.storage.set("doneCategories", this.doneCategories);
        console.log("done array");
        
      }
    );
  }

  public _SaveData(): void {
    this.storage.remove("categories").then(
      () => {
        this.storage.set("categories", this.mCategories);
        console.log("Save data completed");
      }
    );
  }
}
