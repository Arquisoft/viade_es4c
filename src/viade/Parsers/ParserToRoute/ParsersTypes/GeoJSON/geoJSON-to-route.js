import {LineString,Feature,FeatureCollection} from "./Types";

class GeoJSONToRoute {
  selectType=(type) =>{
    switch (type) {
      case "FeatureCollection":
        return new FeatureCollection();
      case "Feature":
        return new Feature();
      case "LineString":
        return new LineString();
      default:
        throw new Error("Type of route GeoJSON not supported");
    }
  }

  execute = (content) => {
    const geoJSON = JSON.parse(content);
    this.parser = this.selectType(geoJSON.type);
    return this.parser.execute(geoJSON);
  };
}

export default GeoJSONToRoute;
