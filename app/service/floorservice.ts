import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

import 'rxjs/Rx';



@Injectable()
export class FloorService {




  constructor() {
  
    console.log("floor service is working");
    
  }
  
getRooms(floorid:string) {

    return firebase.database().ref("floors/"+floorid+"/rooms/").once('value');
  
}


addroom(floorid:string,roomname:string) {

   let newPostKey = firebase.database().ref().child('floors').push().key;
   
   console.log("newPostKey"+newPostKey);
   
      let postData = {
      
         name: roomname

       };

      // Write the new post's data simultaneously in the posts list and the user's post list.
      let updates = {};      
      updates['/floors/'+floorid+'/rooms/' + newPostKey] = postData;
      firebase.database().ref().update(updates);      
      return firebase.database().ref("floors/"+floorid+"/rooms/").once('value');
}
  
}
