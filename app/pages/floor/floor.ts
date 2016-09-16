import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {FloorService} from '../../service/floorservice';
import {RoomData} from '../../DTO/RoomData';
import {FloorData} from '../../DTO/FloorData';
import {RoomView} from '../../components/room-view';

@Component({
  templateUrl: 'build/pages/floor/floor.html',
    providers:[FloorService],
   directives: [RoomView]
})
export class Floor {

public rooms:Array<RoomData>=[];
public floorService:FloorService;

constructor(private navCtrl: NavController,floorService: FloorService,navParams:NavParams) {
  var self;
  self=this;
  this.floorService=floorService;
  let selectedFloor:FloorData=navParams.get('selected_floor');  
  floorService.getRooms(selectedFloor.id).then(function (snapshot) {
         let room=snapshot.val();
         
          for (let id in room) {
            console.log(id); 
            self.rooms.push(new RoomData(id,room[id].name));
          }
          
        });
        
      this.addRoom(selectedFloor.id,"someroom"); 
  
  }
  
  
  addRoom(floorid:string,roomname:string) {
       var self;
       self=this;
        this.floorService.addroom(floorid,roomname).then(function (snapshot) {
         let room=snapshot.val();
          console.log(room);
           console.log("here");
           self.rooms=[];
          for (let id in  room) {
            console.log(id); 
            self.rooms.push(new RoomData(id,room[id].name));
          }          
        });
    }
 
 
}
