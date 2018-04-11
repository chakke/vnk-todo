import { Component, ViewChild, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, ViewController, AlertController, ModalController } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { SessionDetal1Page } from '../session-detal1/session-detal1';
import { ConferenceDataProvider } from '../../providers/conference-data/conference-data';
import { Detail } from '../../interface/detail';
import { List } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
// import {InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient } from '@angular/common/http';
import { Refresher } from 'ionic-angular/components/refresher/refresher';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataService } from '../../services/data-service';
import { Form } from '@angular/forms/src/directives/form_interface';
import { ToDoDetailPage } from '../to-do-detail/to-do-detail';
import { count } from 'rxjs/operators/count';
import { Button } from 'ionic-angular/components/button/button';


export class AbstractObject {
  public onJsonData(data): void {
    if (!data) return;
    let keys = Object.keys(data);
    keys.forEach(key => {
      this[key] = data[key];
    });
  }

  public getJsonData(data) {
    let object = {};
    let keys = Object.keys(this);
    keys.forEach(key => {
      object[key] = this[key];
    });
    return object;
  }
}

export class Session extends AbstractObject {
  public id: string;
  public name: string;
  public description: string;
  public date: string;
  public time: string;

  showDateTime = true;
  showCheckBox = false;
  constructor() {
    super();
    this.reset();
  }
  public reset(): void {
    this.id = "";
    this.name = "";
    this.description = "";
    this.date = "";
    this.time = "";
    this.showDateTime = true;
    this.showCheckBox = false;
  }

  isMatchSearch(query: string): boolean {

    return this.name.toLowerCase().indexOf(query) != 1;
  }

}

export class Category extends AbstractObject {
  id: string;
  name: string;
  description: string;
  items: Array<Session>;
  icon: any;
  lol: string;
  date : string;
  // time: string;
  showDateTime = true;
  showDivClick = true;
  showDivUnClick = false;
  showCalendar = false;
  showTitle = false;
  showTitleFirst = true;
  isChecked = false;
  showFilter = false;
  alert = false;



  constructor() {
    super();
    this.reset();
  }
  public reset(): void {
    this.id = "";
    this.name = "";
    this.description = "";
    this.icon = "";
    this.lol = "";
    this.date = "";
    // this.time = ""
    this.items = [];
    this.showDateTime = true;
    this.showDivClick = true;
    this.showDivUnClick = false;
    this.isChecked = false;
    this.showCalendar = false;
    this.showTitle = false;
    this.showTitleFirst = true;
    this.showFilter = false;
    this.alert = false;

  }
  public addSession(session: Session): void {
    if (this.items.indexOf(session) == -1)
      this.items.push(session);
  }
  public removeSession(session: Session): void {
    let index = this.items.indexOf(session);
    if (index != -1) {
      this.items.splice(index, 1);
    }
  }
  public getSession(id: string): Session {
    this.items.forEach(item => {
      if (item.id === id) return item;
    })
    return null;
  }

  public searchSession(query: string): Array<Session> {
    query = query.trim().toLowerCase();
    let results: Array<Session> = [];
    results = this.items.filter(item => {
      return item.isMatchSearch(query);
    });
    return results;
  }
}

export class DayOfWeek extends AbstractObject {
  public dayOfWeek: String;
  constructor() {
    super();
    this.reset();
  }

  public reset(): void {
    this.dayOfWeek = '';
  }
}

export class Day extends AbstractObject {
  day: Number;
  dayOfWeek: Array<DayOfWeek>;
  clickCalendar = false;

  constructor() {
    super();
    this.reset();
  }

  public reset(): void {
    this.day = 0;
    this.dayOfWeek = [];
    this.clickCalendar = false;
  }

  public addDayOfWeek(dayOfWeek: DayOfWeek): void {
    if (this.dayOfWeek.indexOf(dayOfWeek) == -1)
      this.dayOfWeek.push(dayOfWeek);
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



// @Injectable()
@Directive({ selector: '[myHighlight]' })
export class HomePage {
  @ViewChild('todoList', { read: List }) todoList: List;
  parentArr: any = [];
  groups: any = [];
  name: String;
  description: String;
  countClick: number = 0;
  countTicks: number = 0;

  data: any;
  info: Detail = { id: 0, name: '', description: '', date: '', time: '', icon: '', date_filter: '' };
  imgPath: String;
  isEmpty: boolean = false;


  mCategories: Array<Category> = [];
  doneCategories: Array<Category> = [];
  mCalendar: Array<Day> = [];

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

  bands : Array<any> = [ 
    { genre: 'Rap', band: 'Migos', albums: 2},
    { genre: 'Pop', band: 'Coldplay', albums: 4, awards: 13},
    { genre: 'Rock', band: 'Breaking Benjamins', albums: 1}
   ];

  constructor(
    private el: ElementRef, private renderer: Renderer,
    public navCtrl: NavController,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public confData: ConferenceDataProvider,
    public menuCtrl: MenuController,
    public dataService: DataService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public mModalController: ModalController,
    public mViewController: ViewController,
    public navParams: NavParams,
    public calendar: Calendar
  ) {
    console.log(this.bands.sort(this.compareValues('albums', 'desc')));


    
    
  }



  onClickDismiss() {
    this.mViewController.dismiss({

    }, "", {
        animate: false
      });
  }

  ionViewDidLoad() {
    this._LoadData();
    // this.onClickDismiss();
  }

  addCategory(category: Category) {
    this.mCategories.push(category);
    this.mCategories.sort(this.compareValues('date', 'asc'))
    this._SaveData();
  }

  onClickRemoveCategory(category: Category) {
    let index = this.mCategories.indexOf(category);
    console.log(category.name, index);

    if (index != -1) {
      this.mCategories.splice(index, 1);
    }
    console.log(this.mCategories);

    this._SaveData();
    let alert = this.alertCtrl.create({
      title: "Đã xóa",
      buttons: [{
        text: "OK"
      }]
    });
    alert.present();
  }

  // Load data from storage to show to screen
  public _LoadData(): any {
    console.log("begin load data");

    this.storage.get("categories").then(val => {
      if (val) {
        console.log("Load data completed", val);
        this.onLoadedData(val);

      }
    })
  }

  

  onLoadedData(val) {
    this.mCategories = val;
    /*
      Filter array
    */
    // console.log();
    this.mCategories.sort(this.compareValues('date', 'asc'));


    this.mCategories.forEach(category => {
      category.items.forEach(item => {        

        item.showCheckBox = false;
        item.showDateTime = true;
        category.showDivClick = true;
        category.showDivUnClick = false;
        category.showTitleFirst = true;
        category.showTitle = false;
        category.showFilter = false;
        category.showCalendar = false;
        category.alert = false;
        // category.isChecked = false;
      });
    });
  }

  compare(a, b) {
    // Dùng toUpperCase() để không phân biệt ký tự hoa thường
    const genreA = a.genre.toUpperCase();
    const genreB = b.genre.toUpperCase();
    
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
   }

   compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // không tồn tại tính chất trên cả hai object
          return 0; 
      }
    
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
    
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
   }

  public _LoadDoneData(): any {
    this.storage.get("doneCategories").then(val => {
      console.log(val);
      this.onLoadedDoneData(val);
    })
  }

  onLoadedDoneData(val) {
    this.doneCategories = val;
    // this.navParams.data.array = val;
    console.log("home donecategorites", this.doneCategories);

    this.navCtrl.push('DoneListPage', { array: this.doneCategories });
  }

  public _SaveData(): void {
    this.storage.remove("categories").then(
      () => {
        this.storage.set("categories", this.mCategories);
        console.log("Save data completed");
      }
    );
  }

  public _SaveDoneData(): void {
    this.storage.remove("doneCategories").then(
      () => {
        this.storage.set("doneCategories", this.doneCategories);
        console.log("Save done data completed");
        console.log(this.doneCategories);
      }
    );
    console.log(this.doneCategories);
  }

  // Refresh page
  doRefresh(refresh: Refresher) {
    this._LoadData();

    setTimeout(() => {
      refresh.complete();
      let toast = this.toastCtrl.create({
        message: "Refresh list done",
        duration: 5000
      })
      toast.present();
    }, 1000);

    document.getElementById("calendar-filter").style.display = "none";
    document.getElementById("title").style.display = "block";
  }

  showMenu() {
    this.menuCtrl.toggle('right');
    // document.getElementById("abc").style.background = "rgba(0, 0, 0, 0.4) !important";
  }
  // || this.info.description == "" || this.info.date == "" || this.info.time == ""
  // Get info in form add to create new Task
  addNewTask(ngForm: Form) {
    if (this.info.name == "") {
      let blankAlert = this.alertCtrl.create({
        title: "Bạn cần điền đầy đủ vào các form",
        buttons: ["OK"]
      });
      blankAlert.present();
    } else {
      let category = new Category();
      category.id = "" + (this.mCategories.length + 1);
      category.name = this.info.name;
      category.date = this.info.date.toString().substring(0,4).concat(this.info.date.toString().substring(5,7)).concat(this.info.date.toString().substring(8,10));
      category.description = this.info.description;
      category.icon = this.info.icon;

      let session = new Session();
      session.description = this.info.description;
      session.time = this.info.time;
      session.date = this.info.date.toString().substring(0,4).concat(this.info.date.toString().substring(5,7)).concat(this.info.date.toString().substring(8,10));
      
      // this.formatDate(this.info.date, session);

      category.addSession(session);
      this.addCategory(category);

      // let complete = this.alertCtrl.create({
      //   title: 'Tạo lịch thành công',
      //   buttons: [{
      //     text: "OK",
      //     handler: () => {
      //       this.ionViewDidLoad();
      //     }
      //   }]
      // });
      // complete.present();

      let toast = this.toastCtrl.create({
        message : "Tạo lịch thành công",
        duration : 3000
      });

      toast.dismiss();
      toast.present();

      this.info.name = '';
      this.info.description = "";
      this.info.date = "";
      this.info.time = ""

      this.menuCtrl.close();
    }
    
    

    // document.getElementById("div-click1").style.display = "none";
  }

  // Get detail 
  showDetail(category: Category, item: Session, mCategories: Array<Category>) {
    console.log("category", this.mCategories);
    let modal = this.mModalController.create(
      "ToDoDetailPage", {
        todo: category,
        session: item,
        array: mCategories
      }
    );
    modal.present({
      // animate: false
    });
  }

  showDoneList() {
    this._LoadDoneData();
  }

  tickItems() {
    // document.getElementById("div-click").style.display = "none";
    // document.getElementById("div-click1").style.display = "none";
    this.mCategories.forEach(category => {
      category.items.forEach(item => {
        item.showCheckBox = true;
        item.showDateTime = false;
        category.showDivClick = false;
        category.showDivUnClick = true;
        category.isChecked = false;
      });
    });

  }

  // Click to delete item
  closeTickItems() {
    // document.getElementById("div-click").style.display = "none";
    // document.getElementById("div-click1").style.display = "none";
    this.mCategories.forEach(category => {
      category.items.forEach(item => {
        item.showCheckBox = false;
        item.showDateTime = true;
        category.showDivClick = true;
        category.showDivUnClick = false;
      });
    });

    // Delete all item
    this.mCategories.forEach(category => {
      category.items.forEach(item => {
        if (category.isChecked == true) {
          this.countClick++;
          if (this.countClick == this.mCategories.length) {
            this.mCategories.splice(0, this.mCategories.length);
            let alert = this.alertCtrl.create({
              title: "Đã xóa",
              buttons: [{
                text: "OK"
              }]
            });
            alert.present();
            this._SaveData();
          }
        }
      });
    });

    // Delete 1 item
    this.mCategories.forEach(category => {
      category.items.forEach(item => {
        if (category.isChecked == true) {
          this.onClickRemoveCategory(category);
        }
      });
    });

    // document.getElementById("div-click1").style.display = "block";
  }

  checkAll() {
    this.countClick += 1;
    let checkBoxes = document.getElementsByClassName("input-checkbox");
    if (checkBoxes && checkBoxes.length > 0) {
      for (let index = 0; index < checkBoxes.length; index++) {
        checkBoxes[index].setAttribute('checked', 'true');
        // Neu click lan dau tien
        if (this.countClick % 2 != 0) {
          checkBoxes[index].setAttribute('checked', 'true');
        }
        else {
          checkBoxes[index].removeAttribute('checked');
        }
      }
    }

    this.mCategories.forEach(category => {
      if (this.countClick % 2 != 0) {
        category.isChecked = true;
      } else {
        category.isChecked = false;
      }
    });
  }

  showSchedule(category) {
    this.mCategories.forEach(category => {
      category.items.forEach(item => {        
        category.showFilter = true;
        category.showDivClick = false;
      });
    });

    category.showCalendar = true;
    
    // category.showTitle = true;
    // category.showTitleFirst = false;
    // console.log(category.showCalendar);
    document.getElementById("title").style.display = "none";
    document.getElementById("calendar-filter").style.display = "block";
    var date = new Date(this.info.date_filter);

    var month = date.getMonth();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  }

  backHome(category: Category){
    this.mCategories.forEach(category => {
      category.items.forEach(item => {
        item.showCheckBox = false;
        item.showDateTime = true;
        category.showDivClick = true;
        category.showDivUnClick = false;
        category.showFilter = false;
      });
    });
    document.getElementById("title").style.display = "block";
    document.getElementById("calendar-filter").style.display = "none";
    this.mCalendar.splice(0, this.mCalendar.length);

    this._LoadData();
  }

  onClickCategory(category) {
    category.isChecked = true;

    console.log(this.mCategories);
    
  }

  onClickIcon(icon) {
    this.info.icon = icon.url;
  }

  clearCalendar() {
    this.mCalendar.splice(0, this.mCalendar.length);
  }

  changeDate(_event) {
    var date = new Date(this.info.date_filter);
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    for (let index = firstday.getDate(); index <= lastday.getDate(); index++) {
      let day = new Day();
      let dayOfWeek = new DayOfWeek();
      var dayOfMonth = new Date(date.getFullYear(), date.getMonth(), index);
      dayOfWeek.dayOfWeek = dayOfMonth.toDateString().substring(0, 3);
      day.addDayOfWeek(dayOfWeek);
      day.day = index;
      this.mCalendar.push(day);
    }
  }

  getInfo(date: Day){
    
    console.log(this.info.date_filter);
    
    
    // var month = new Date(this.info.date_filter).toDateString().substring(4,7);
    var dateSelected = date.day.toString();
    if(date.day < 10){
      dateSelected = "0" + date.day.toString();
    }
    // console.log(dateSelected);
    dateSelected = this.info.date_filter.toString().substring(0,4)
        .concat(this.info.date_filter.toString().substring(5,7))
        .concat(dateSelected);
    
    
    this.mCategories.splice(0, this.mCategories.length);

    this.storage.get("categories").then(val=>{
      val.forEach(category => {
        category.items.forEach(item => {
          if(item.date == dateSelected){
            this.mCategories.push(category);
            console.log(this.mCategories);
          }
        });
        category.showFilter = true;
        category.showDivClick = false;
      });     
    });
    date.clickCalendar = true;
  }
}