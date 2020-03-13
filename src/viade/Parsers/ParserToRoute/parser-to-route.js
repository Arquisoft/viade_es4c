import { GeoJSONToRoute } from "./Parsers";

class ParserToRoute {
  constructor() {}
  selectParser = file => {
    const type = file.name.split(".")[1];
    switch (type) {
      case "geojson":
        return new GeoJSONToRoute(file);
      default:
        console.log("formato no soportado");
        break;
    }
  };

  parse =  file => {
    const f = file;
    const parser = this.selectParser(f);
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = ()=> {
        resolve(parser.execute(reader.result));
      };
      reader.onerror=reject;
      reader.readAsText(f);
    });
  };
}

<<<<<<< HEAD:src/viade/ParserToRoute/parser-to-route.js
const parser = new ParserToRoute();
export default parser;
=======
export default ParserToRoute;
>>>>>>> develop:src/viade/Parsers/ParserToRoute/parser-to-route.js
