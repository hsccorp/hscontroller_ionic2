import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomeService} from '../../service/homeservice';
import {FloorData} from '../../DTO/FloorData';
import {FloorView} from '../../components/floor-view';
import {Floor} from '../../pages/floor/floor';

@Component({
  templateUrl: 'build/pages/myhome/myhome.html',
    providers:[HomeService],
   directives: [FloorView]
})
export class MyHome {

public floors:Array<FloorData>=[];
public homeService:HomeService;

constructor(private navCtrl: NavController,homeService: HomeService) {
  var self;
  self=this;
  this.homeService=homeService;
  
  homeService.getfloor().then(function (snapshot) {
         let floor=snapshot.val();
          console.log(floor);
           console.log("here");
          for (let id in floor) {
            console.log(id); 
            self.floors.push(new FloorData(id,floor[id].name));
          }
          
        });
        
       
  
  }
  
   itemTapped(event, floordata) {
    
        this.navCtrl.push(Floor, {
          selected_floor: floordata
        });
        
        
        
    }
    
    
    addFloor(floorname:string) {
       var self;
       self=this;
        this.homeService.addfloor(floorname).then(function (snapshot) {
         let floor=snapshot.val();
           console.log("here");
           self.floors=[];
          for (let id in  floor) {
            console.log(id); 
            
            self.floors.push(new FloorData(id,floor[id].name));
          }          
        });
    }
    
    removeFloor(floorid:string) {
       var self;
       self=this;
        this.homeService.removefloor(floorid).then(function (snapshot) {
         let floor=snapshot.val();
           console.log("here");
           self.floors=[];
          for (let id in  floor) {
            console.log(id); 
            
            self.floors.push(new FloorData(id,floor[id].name));
          }          
        });
    }
    
    
   
    
    
    
 
 
}


