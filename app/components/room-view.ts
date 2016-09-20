import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {RoomData} from '../DTO/RoomData';
import {NavController,AlertController} from 'ionic-angular';
import {Room} from '../pages/room/room';


@Component({
selector: 'room-view',
templateUrl: 'build/components/room-view.html',

})
export class RoomView {

 @Input() roomdata:RoomData;


constructor(private navCtrl: NavController){

 

}

 itemTapped(event, room) {
    
       
        this.navCtrl.push(Room, {
          selected_room: room
        });
        
       console.log("Click is working "+room.name); 
    }
}