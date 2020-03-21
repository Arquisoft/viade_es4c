import { RouteViade, ItemViade } from "../../Model";
import {sparqlFiddle} from "../../../utils";
<<<<<<< HEAD
import * as comunica from '@comunica/actor-init-sparql';
class RDFToRoute {

  /**
   * Parse route viade in RDF to a RouteViade
   * @param {*} url URL of the route
   * @return A promise
   */
  parse=async (url) =>{
    const engine=comunica.newEngine();
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
      const result= await engine.query(sparql,{sources:[url]});
      const { data } = await engine.resultToString(result, 'application/json');
      return new Promise((resolve,reject)=>{
        
    
    
    let text="";

    data.on('data', (chunk) => {
      text+=chunk;  
    });

    data.on('end',()=> {
      resolve(this.getRoute(JSON.parse(text)));
   });
      });
    
  }


/**
 * @param {*} results Array of JSON objects with the items value
 * @returns RouteViade object
 */
  getRoute=(results)=>{
    if(!results||!results.length) return;
    let items=results.map((i)=>new ItemViade(this.cleanValue(i["?long"]),this.cleanValue(i["?lat"]),"","","",this.cleanValue(i["?elevation"])));
    return new RouteViade(this.cleanValue(results[0]["?name"]),items,this.cleanValue(results[0]["?description"]));
  }

  /**
   * Removes type of literals(RDF) and double quotes
   *  @param {*} value value of literal
   * 
   * Example: "47.64458"^^http://www.w3.org/2001/XMLSchema#decimal => 47.64458
   */
  cleanValue=(value)=>{
    if(!value)return;
    return value.split("^^")[0].replace(/['"]+/g,"");
  }

  arrayToRouteBasic=async (url)=>{
    let promise=this.parse(url);
    let solucion=await  promise.then((result)=>result);
    console.log(solucion);
    //return new RouteViade(result[0]["name"],null,result[0]["description"]);
=======

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
    
    SELECT ?lat ?long ?order ?elevation WHERE {
     ?route a viade:Route.
     ?route viade:point ?point .
     ?point schema:latitude ?lat ;
            schema:longitude ?long ;
            viade:order ?order.
    OPTIONAL {?point schema:elevation ?elevation.}
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
>>>>>>> feature/parser_RDF_Route
  }

}

const parser = new RDFToRoute();
<<<<<<< HEAD

parser.arrayToRouteBasic("https://christianpelaez98.solid.community/ejemplos/ruta1.ttl");
parser.arrayToRouteBasic("https://christianpelaez98.solid.community/ejemplos/ruta2.ttl");
parser.arrayToRouteBasic("https://christianpelaez98.solid.community/ejemplos/ruta3.ttl");
parser.arrayToRouteBasic("https://christianpelaez98.solid.community/ejemplos/ruta4.ttl");
=======
parser.parse("https://christianpelaez98.solid.community/public/labra.ttl");
>>>>>>> feature/parser_RDF_Route
export default parser;
