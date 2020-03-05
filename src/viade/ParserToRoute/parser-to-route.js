import {GeoJSONToRoute} from"./Parsers";

class ParserToRoute{
    constructor(file){
        this.file=file;
        this.selectParser(file);
        this.parser=null;
    }

    selectParser(file){
        switch (file.type) {
            case "geojson.json":
                this.parser=new GeoJSONToRoute(file);
                break; 
            default:
                console.log("formato no soportado");
                break;
        }
    }

    parse(){
        return this.parser.execute();
    }
}
