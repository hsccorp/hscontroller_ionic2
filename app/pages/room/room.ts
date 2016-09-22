import {Component} from '@angular/core';
import {NavController,NavParams,AlertController,Platform} from 'ionic-angular';
import {RoomService} from '../../service/roomservice';
import {DeviceData} from '../../DTO/DeviceData';
import {DeviceView } from '../../components/device-view';

@Component({
  templateUrl: 'build/pages/room/room.html',
  providers:[RoomService],
  directives:[DeviceView]
})

export class Room {
public selectedRoom:any;
public roomName:any;
public floorId:any;
public roomId:any;
public devices:Array<DeviceData>=[];
public roomService:RoomService;



constructor(private navCtrl:NavController,navParams:NavParams,roomService:RoomService,public alertCtrl: AlertController,private platform: Platform) {

var self;
self=this;
this.roomService=roomService;
this.selectedRoom=navParams.get('selected_room');
this.roomName=this.selectedRoom.name;
this.roomId=this.selectedRoom.id;
this.floorId=this.selectedRoom.floorId;
console.log("Floor id is "+this.floorId);


 roomService.getDevices(self.selectedRoom.floorId,self.selectedRoom.id).then(function (snapshot) {
         let device=snapshot.val();
         
          for (let id in device) {
            console.log("hkb"+id); 
            self.devices.push(new DeviceData(id,device[id].name));
          }
          
        });
        
    this.platform.registerBackButtonAction(() => {
      
                console.log("room hardware back button is working");
      
                this.goBack();
			
		});
        
      
  
  }
  
    popup()
  {
  console.log("Popup is working");
  
 let prompt = this.alertCtrl.create({
      title: 'Add Device' ,     
      inputs: [
        {
          name: 'device',
          placeholder: 'Add Device'
          
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
          console.log(data.device);
            this.addDevice(this.floorId,this.roomId,data.device);
        
        
          }
        }
      ]
    });
    prompt.present();
  }
  
  addDevice(floorid:string,roomid:string,devicename:string) {
       var self;
       self=this;
        this.roomService.adddevice(floorid,roomid,devicename).then(function (snapshot) {
         let device=snapshot.val();
          self.devices=[];
          for (let id in device) {
            console.log("hkb"+id); 
            self.devices.push(new DeviceData(id,device[id].name));
          }
        });
    }
    
    goBack()
  {
  this.navCtrl.pop({animate: true, direction: 'back', animation: "ios-transition,duration:750"});
  }

}

