import { RouteViade, ItemViade, ImageViade, VideoViade } from "../../Model";
import { sparqlFiddle } from "../../../utils";

import auth from "solid-auth-client";
import FC from "solid-file-client";

const fc = new FC(auth);
class RDFToRoute {
  parse = async (url) => {
    const sparql = `PREFIX schema: <http://schema.org/>
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
      wanted: "Array",
    };

    const result = await sparqlFiddle.run(fiddle).then(
      (results) => {
        return results;
      },
      (err) => console.log(err)
    );

    let sparqlMedia = `
        PREFIX schema: <http://schema.org/>
        PREFIX viade:<http://arquisoft.github.io/viadeSpec/>
      
      SELECT ?iri ?publishedDate ?author WHERE {
       ?route a viade:Route.
       ?route viade:hasMediaAttached ?media .
       ?media schema:contentUrl ?iri ;
              schema:publishedDate ?publishedDate ;
              schema:author ?author.
      }
        `;

    let fiddleMedia = {
      data: url,
      query: sparqlMedia,
      wanted: "Array",
    };
    const resultMedia = await sparqlFiddle.run(fiddleMedia).then(
      (results) => {
        return results;
      },
      (err) => console.log(err)
    );
    let media = await this.getMedia(resultMedia);
    return this.getRoute(result, media, url);
  };

  getMedia = async (results) => {
    let media = [];
    let i;
    for (i=0;i<results.length;i++) {
      let blob = await fc.readFile(results[i]["iri"]);
      switch (blob.type.split("/")[0]) {
        case "image":
          media.push(
            new ImageViade(
              results[i]["iri"],
              results[i]["author"],
              results[i]["publishedDate"],
              blob
            )
          );
          break;
          case "video":
            media.push(
              new VideoViade(
                results[i]["contentUrl"],
                results[i]["author"],
                results[i]["publishedDate"],
                blob
              )
            );
        default:
          break;
      }       
    }
    return media;
  };

  getRoute = (results, media, url) => {
    if (!results || !results.length) {
      return;
    }
    let items = results.map(
      (i) =>
        new ItemViade(
          this.parseToFloat(i["long"]),
          this.parseToFloat(i["lat"]),
          this.parseToFloat(i["order"]),
          this.parseToFloat(i["elevation"])
        )
    );
    return new RouteViade(
      results[0]["name"],
      items,
      results[0]["description"],
      media,
      [],
      url
    );
  };

  parseToFloat = (value) => {
    if (!value) {
      return;
    }
    return parseFloat(value);
  };
}

const parser = new RDFToRoute();

export default parser;
