import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

import 'rxjs/Rx';



@Injectable()
export class RoomService {




  constructor() {
  
    console.log(" Room service is working");
    
  }
  getDevices(floorid:string,roomid:string) {
  
  console.log("room service is working");

    return firebase.database().ref("floors/"+floorid+"/rooms/"+roomid+"/devices/").once('value');
  
}
  
  adddevice(floorid:string,roomid:string,devicename:string) {

   let newPostKey = firebase.database().ref().child('rooms').push().key;
   
   console.log("newPostKey"+newPostKey);
   
      let postData = {
      
         name: devicename

       };

      // Write the new post's data simultaneously in the posts list and the user's post list.
      let updates = {};      
      updates['/floors/'+floorid+'/rooms/'+roomid+'/devices/'+ newPostKey] = postData;
      firebase.database().ref().update(updates);      
     return firebase.database().ref("floors/"+floorid+"/rooms/"+roomid+"/devices/").once('value');
}
  }
  
