import { ItemViade, RouteViade } from "../../../Model";

class GeoJSONToRoute {
    
  execute = (content) => {
    return this.parse(content);
  };

  //Por ahora solo soportaremos LineString
  parse = (content) => {
    const geoJSON = JSON.parse(content);
    const items = this.getItems(geoJSON.coordinates);
    const route = new RouteViade("Unknown", items);
    return route;
  };

  getItems = (coordinates) => {
    return coordinates.map((coor,index) => {
      return new ItemViade(coor[0], coor[1],index);
    });
  };
}

export default GeoJSONToRoute;