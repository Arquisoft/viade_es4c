
import { GeoJSONToRoute } from "./ParsersTypes";
import { GpxToRoute } from "./ParsersTypes";

class ParserToRoute {
  selectParser = (file) => {
    const type = file.name.split(".")[1];
    switch (type) {
      case "json":
      case "geojson":
      case "GeoJSON":
        return new GeoJSONToRoute(file);
      case "gpx":
        return new GpxToRoute(file);
      default:
        throw new Error("Formato no soportado");
        console.log("formato no soportado");
        break;
    }
  };

  parse =  (file) => {
    const f = file;
    const parser = this.selectParser(f);
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(parser.execute(reader.result));
      };
      reader.onerror=reject;
      reader.readAsText(f);
    });
  };
}

const parser = new ParserToRoute();

export default parser;
