import {GeoJSONToRoute} from"./Parsers";

class ParserToRoute{
    constructor(file){
        this.file=file;
        this.selectParser(file);
    }

    selectParser(file){
        switch (file.parser) {
            case ".json":
                this.parser=new GeoJSONToRoute(file);
                break; 
            default:
                console.log("formato no soportado");
                break;
        }
    }

    parse(){
        this.parser.execute();
    }
}
