import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

import 'rxjs/Rx';



@Injectable()
export class HomeService {
public floor1:any;
public db :any;
public c1:any;



  constructor() {
  
    console.log("floor service is working");
    this.getfloor();
  }
  
getfloor() {

   return firebase.database().ref('floors').once('value');
}


addfloor(floorname:string) {

   let newPostKey = firebase.database().ref().child('floors').push().key;
   console.log("newPostKey"+newPostKey);
   
      let postData = {
      
         name: floorname

       };

      // Write the new post's data simultaneously in the posts list and the user's post list.
      let updates = {};
      updates['/floors/' + newPostKey] = postData;
      firebase.database().ref().update(updates);      
      return firebase.database().ref('floors').once('value');
}

removefloor(floorid:string) {
    
      firebase.database().ref("floors").child(floorid).remove();
      return firebase.database().ref('floors').once('value');
}
  
}
