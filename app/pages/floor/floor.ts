import {Component} from '@angular/core';
import {NavController,NavParams,AlertController,Platform } from 'ionic-angular';
import {FloorService} from '../../service/floorservice';
import {RoomData} from '../../DTO/RoomData';
import {FloorData} from '../../DTO/FloorData';
import {RoomView} from '../../components/room-view';
import {Room} from '../../pages/room/room';
import { ActionSheetController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/floor/floor.html',
    providers:[FloorService],
   directives: [RoomView]
})
export class Floor {

public rooms:Array<RoomData>=[];
public floorService:FloorService;
public selectedFloor:FloorData;
public floorName:any;
public floorId:any;


constructor(private navCtrl: NavController,floorService: FloorService,navParams:NavParams,public alertCtrl: AlertController,private platform: Platform,public actionSheetCtrl: ActionSheetController) {

  var self;
  self=this;
 
  this.floorService=floorService;
  this.selectedFloor=navParams.get('selected_floor');  
   this.floorName=this.selectedFloor.name;
   this.floorId=this.selectedFloor.id;
   console.log("floorid is "+this.floorId);
   
  floorService.getRooms(self.floorId).then(function (snapshot) {
         let room=snapshot.val();
         
          for (let id in room) {
            console.log("hkb"+id); 
            self.rooms.push(new RoomData(self.floorId,id,room[id].name));
          }
          
        });
        
      //this.addRoom(selectedFloor.id,"someroom"); 
      
     
  
  }
  
 
  
  ionViewWillEnter()
  {
    this.deRegisterBackButton();
  }
  
  deRegisterBackButton()
  {
  this.platform.registerBackButtonAction(() => {
      
                console.log("disabling room  hardware back button is working ");
      
              this.customBackButton();
			
		});
  }
  
  
  customBackButton()
  {
  console.log("disbaled room hardware back button ");
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
            self.rooms.push(new RoomData(floorid,id,room[id].name));
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
  
  goBack()
  {
  this.navCtrl.pop({animate: true, direction: 'back', animation: "ios-transition,duration:750"});
  }
 ionViewDidEnter()
 {
 this.platform.registerBackButtonAction(() => {
      
                console.log("floor hardware back button is working ");
      
                this.goBack();
			
		});
 }
 
  itemTapped(event, room) {
    
       
        this.navCtrl.push(Room, {
          selected_room: room
        },{animate: true, direction: 'forward', animation: "ios-transition,duration:750"});
        
       console.log("Click is working "+room.name); 
    }
    itemTap(event,room)
    {
    console.log("Double tap is working");
        let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete the room',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.removeRoom(room);
          }
        }
      ]
    });
    actionSheet.present();
    }
    
    removeRoom(room:any)
    {
    console.log("Delete Room Working");
    console.log("Deleted room is "+room.name)
    let roomId=room.id;
    let floorid=room.floorId;
    console.log("deleted room belongs to floor id"+floorid);
     var self;
       self=this;
        this.floorService.removeRoom(floorid,roomId).then(function (snapshot) {
         let room=snapshot.val();
          console.log(room);
           console.log("here");
           self.rooms=[];
          for (let id in  room) {
            console.log(id); 
            self.rooms.push(new RoomData(floorid,id,room[id].name));
          }     
          
        });
        
       
    }
 
}
