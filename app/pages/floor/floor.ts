import {Component} from '@angular/core';
import {NavController,NavParams,AlertController} from 'ionic-angular';
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
public selectedFloor:FloorData;

constructor(private navCtrl: NavController,floorService: FloorService,navParams:NavParams,public alertCtrl: AlertController) {
  var self;
  self=this;
  this.floorService=floorService;
  this.selectedFloor=navParams.get('selected_floor');  
  floorService.getRooms(this.selectedFloor.id).then(function (snapshot) {
         let room=snapshot.val();
         
          for (let id in room) {
            console.log("hkb"+id); 
            self.rooms.push(new RoomData(id,room[id].name));
          }
          
        });
        
      //this.addRoom(selectedFloor.id,"someroom"); 
  
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
    
     popup()
  {
  console.log("Popup is working");
  
 let prompt = this.alertCtrl.create({
      title: 'Add Floor' ,     
      inputs: [
        {
          name: 'room',
          placeholder: 'Add Room'
          
        }
        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addRoom(this.selectedFloor.id,data.room);
        
          }
        }
      ]
    });
    prompt.present();
  }
 
 
}
