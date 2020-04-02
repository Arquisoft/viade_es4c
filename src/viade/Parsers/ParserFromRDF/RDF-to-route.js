import { RouteViade, ItemViade } from "../../Model";
import {sparqlFiddle} from "../../../utils";
class RDFToRoute {

  
  parse=async (url) => {
    const sparql =
      `PREFIX schema: <http://schema.org/>
      PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
      PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?lat ?long ?order ?name ?description ?name ?elevation WHERE {
       ?route a viade:Route.
       ?route viade:point ?point .
       ?point schema:latitude ?lat ;
              schema:longitude ?long ;
              viade:order ?order.
      OPTIONAL {?route schema:description ?description.}
      OPTIONAL {?route schema:name ?name.}
      OPTIONAL {?point schema:elevation ?elevation.}
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
      return this.getRoute(result,url);    
  };

  getRoute=(results,url) => {
    if(!results||!results.length) {return;}
    let items=results.map((i) => new ItemViade(this.parseToFloat(i["long"]),this.parseToFloat(i["lat"]),this.parseToFloat(i["order"]),this.parseToFloat(i["elevation"])));
    return new RouteViade(results[0]["name"],items,results[0]["description"],[],[],url);
  };

  parseToFloat=(value) => {
    if(!value){return;}
    return parseFloat(value);

  }

}

const parser = new RDFToRoute();

export default parser;
