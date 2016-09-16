import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {RoomData} from '../DTO/RoomData';


@Component({
selector: 'room-view',
templateUrl: 'build/components/room-view.html',

})
export class RoomView {

 @Input() roomdata:RoomData;


constructor() {


}
}