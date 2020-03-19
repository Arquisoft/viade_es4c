import { RouteViade, ItemViade } from "../../Model";
import {sparqlFiddle} from "../../../utils";


var items = [];

const item1 = new ItemViade();
item1.longitude=42.7843378;
item1.latitude=-8.8879561;
item1.name="Item1";
item1.description="Description1";
items.push(item1);

const item2 = new ItemViade();
item2.longitude=42.7788287;
item2.latitude=-8.8891135;
item2.name="Item2";
item2.description="Description2";
items.push(item2);

const item3 = new ItemViade();
item3.longitude=42.7740152;
item3.latitude=-8.8903451;
item3.name="Item3";
item3.description="Description3";
items.push(item3);

const item4 = new ItemViade();
item4.longitude=42.7706397;
item4.latitude=-8.8899538;
item4.name="Item4";
item4.description="Description4";
items.push(item4);

class RDFToRoute {
  async parse(url) {
    const sparql =
      `PREFIX viade:  <http://arquisoft.github.io/viadeSpec/>
      PREFIX schema: <http://schema.org/>\
      SELECT ?name ?description WHERE {  ?ruta a viade:Route;
      schema:name  ?name.
      OPTIONAL {?ruta schema:description ?description .}
      }`;

    let fiddle = {
      data: url,
      query: sparql,
      wanted: "Array"
    };

    const result = await sparqlFiddle.run(fiddle).then(
      results => {
        return results;
      },
      err => console.log(err)
    );
    let ruta=this.arrayToRouteBasic(result);
    console.log(ruta);
    return ruta;
  }

  arrayToRouteBasic=(result)=>{
    return new RouteViade(result[0]["name"],items,result[0]["description"]);
  }
 
}

const parser = new RDFToRoute();

export default parser;
