import { RouteViade} from "../../Model";
import {sparqlFiddle} from "../../../utils";
class SmallRDFToRoute {

  
  parse=async (url) => {
    const sparql =
      `PREFIX schema: <http://schema.org/>
      PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
      PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?name ?description WHERE {
       ?route a viade:Route.
       ?route viade:point ?point .
       ?route schema:name ?name.
      OPTIONAL {?route schema:description ?description.}
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
      return this.getRoute(result);    
  };

  getRoute=(results) => {
    if(!results||!results.length) {return;}
    return new RouteViade(results[0]["name"],null,results[0]["description"]);
  };

}

const parser = new SmallRDFToRoute();

export default parser;
