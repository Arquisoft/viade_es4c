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
  
      try{
      const result = await sparqlFiddle.run(fiddle).then(
          (results) => {
          return results;
        },
        err => {throw err;}
      );
      return this.getRoute(result,url);    
      }catch(err){
        throw err;
      }
  };

  getRoute=(results,url) => {
    if(!results||!results.length) {return;}
    return new RouteViade(results[0]["name"],null,results[0]["description"],[],[],url);
  };

}

const parser = new SmallRDFToRoute();

export default parser;
