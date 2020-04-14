import LineString from "./line-string";

class Feature {
  selectType = (type) => {
    switch (type) {
      case "LineString":
        return new LineString();
      default:
        throw new Error("Feature of route GeoJSON not supported");
    }
  };

  execute(geoJSON) {
    const geometry = geoJSON.geometry;
    this.parser = this.selectType(geometry.type);
    return this.parser.execute(geometry);
  }
}

export default Feature;
