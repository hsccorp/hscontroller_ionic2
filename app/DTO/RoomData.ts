export class RoomData {
    id: string;
    name: string;
    floorId:string;
    
    constructor(floorId:string,id: string,name: string) {
        this.floorId=floorId;
        this.id=id;
        this.name=name;
        
  
    }
        
}