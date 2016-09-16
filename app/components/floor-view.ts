import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {FloorData} from '../DTO/FloorData';


@Component({
selector: 'floor-view',
templateUrl: 'build/components/floor-view.html',

})
export class FloorView {

 @Input() floordata:FloorData;


constructor() {


}
}