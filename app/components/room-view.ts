import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {RoomData} from '../DTO/RoomData';
import {NavController,AlertController} from 'ionic-angular';
import {Room} from '../pages/room/room';
import { ActionSheetController } from 'ionic-angular';
import {FloorService} from '../service/floorservice';



@Component({
selector: 'room-view',
templateUrl: 'build/components/room-view.html',
providers:[FloorService]

})
export class RoomView {


public floorService:FloorService;

 @Input() roomdata:RoomData;


constructor(private navCtrl: NavController,public actionSheetCtrl: ActionSheetController,floorService:FloorService){

 this.floorService=floorService;

}


}