import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import * as firebase from 'firebase';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { MyHome } from './pages/myhome/myhome';
import { Floor } from './pages/floor/floor';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyHome;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    
     var config = {
			  apiKey: "AIzaSyAKNOHduhs1W7YTq2Iu7itmWvvBKD0DF3Q",
			  authDomain: "ionic-7aaa6.firebaseapp.com",
			  databaseURL: "https://ionic-7aaa6.firebaseio.com",
			  storageBucket: "",
			};
  
  firebase.initializeApp(config);
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 },
      { title: 'My Home', component: MyHome }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

 
}

ionicBootstrap(MyApp);
