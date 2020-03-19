import { RouteViade, ItemViade } from "../../Model";
import {sparqlFiddle} from "../../../utils";
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
    return new RouteViade(result[0]["name"],this.basicPoints(),result[0]["description"]);
  }

  basicPoints=()=>{
    let array=[];
    let i;
    let size=10;
    for(i=0;i<size;i++){
      array.push(new ItemViade(100+i,100+i,'Punto'+i));
    }
    return array;
  }

 
}

const parser = new RDFToRoute();

export default parser;
