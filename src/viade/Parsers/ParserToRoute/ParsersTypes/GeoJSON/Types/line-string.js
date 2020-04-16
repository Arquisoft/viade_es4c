import {ItemViade,RouteViade} from "../../../../../Model";

class LineString{
  execute = (geoJSON) => {
    const items = this.getItems(geoJSON.coordinates);
    const route = new RouteViade("Unknown", items);
    return route;
  };

  getItems = (coordinates) => {
    return coordinates.map((coor, index) => {
      return new ItemViade(coor[0], coor[1], index);
    });
  };
}

export default LineString;