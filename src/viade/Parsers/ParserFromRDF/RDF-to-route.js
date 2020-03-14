import { RouteViade, ItemViade } from "../../Model";
import data from "@solid/query-ldflex";

class RDFToRoute {
  constructor() {}
  parse() {
    const ruta = data["https://christianpelaez98.solid.community/public/games/tictactoe/1581433208146.ttl#"];
    console.log(ruta);
    this.prueba(ruta);
  }

  prueba=async (person)=>{
    const label = await person["http://data.totl.net/game/initialState"];
    console.log(`\nNAME: ${label}`);
}
}

const parser = new RDFToRoute();

export default parser;
