import { RouteViade, ItemViade } from "../../Model";
import {sparqlFiddle} from "../../../utils";

class RDFToRoute {
  parse=async (urlOrContent)=> {
    const route=await this.getRoute(urlOrContent);
    const items=await this.getItems(urlOrContent);
    route.items=items;
    console.log(route);
    return route;
  }

  getItems=async (url)=>{
    const queryItems =
    `PREFIX schema: <http://schema.org/>
    PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
    PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
    SELECT ?lat ?long ?order ?name WHERE {
     ?ruta a viade:Route;
     viade:point ?point .
     ?point schema:latitude ?lat ;
            schema:longitude ?long ;
            viade:order ?order.
    }`;


  let fiddle = {
    data: url,
    query: queryItems,
    wanted: "Array"
  };

  const items = await sparqlFiddle.run(fiddle).then(
    results => {
      return results;
    },
    err => console.log(err)
  );

    return this.toItemsViade(items);
  }

  toItemsViade=(arrayFiddle)=>{
    return arrayFiddle.map((obj)=>new ItemViade(obj.long,obj.lat));
  }

  getRoute=async(url)=>{
    const queryRoute =
    `PREFIX viade:  <http://arquisoft.github.io/viadeSpec/>
    PREFIX schema: <http://schema.org/>\
    SELECT ?name ?description WHERE {  ?ruta a viade:Route;
    schema:name  ?name.
    OPTIONAL {?ruta schema:description ?description .}
    }`;

  let fiddle = {
    data: url,
    query: queryRoute,
    wanted: "Array"
  };

  const route = await sparqlFiddle.run(fiddle).then(
    results => {
      return results;
    },
    err => console.log(err)
  );
  return new RouteViade(route[0].name,null,route[0].description);
  }

}

const parser = new RDFToRoute();

export default parser;
