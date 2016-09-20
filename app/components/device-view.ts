import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {DeviceData} from '../DTO/DeviceData';


@Component({
selector: 'device-view',
templateUrl: 'build/components/device-view.html',

})
export class DeviceView {

 @Input() devicedata:DeviceData;


constructor() {


}
}