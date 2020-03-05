import {RouteViade,ItemViade} from "../../Model";

class GeoJSONToRoute {
    constructor(file){
        this.file=file;
        this.fileReader=new FileReader();
    }

    execute(){
        this.fileReader.onload=async (event)=>{
            return this.parse(event.target.result);
        }
    }

    //Por ahora solo soportaremos LineString
    parse(content){
        const geoJSON=JSON.parse(content);
        const items=this.getItems(geoJSON.coordinates);
        const route=new RouteViade(this.file.name,items);
        return route;
    }

    getItems(coordinates){
        return coordinates.map((coor)=>{
          return new ItemViade(coor[0],coor[1]);
        })
    }
}

export default GeoJSONToRoute;