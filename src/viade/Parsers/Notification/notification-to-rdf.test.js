import { NotificationViade } from "../../Model";
import { NotificationToRDF } from ".";
describe.only("Parser from RDF to notification", () => {
  const input = new NotificationViade(
    "Route share",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "https://christianpelaez98.solid.community/profile/card#me",
    "https://christianpelaez98.solid.community/ejemplos/ruta1.ttl",
    "2020-03-26T00:57:21.984Z",
    "undefined",
    "https://viadees4c.solid.community/profile/card#me",
    true,
    "https://testses4c.solid.community/public/notification.ttl"
  );

  const output = `@prefix terms: <http://purl.org/dc/terms#>.
        @prefix as: <https://www.w3.org/ns/activitystreams#>.
        @prefix schema: <http://schema.org/>.
        @prefix solid: <https://www.w3.org/ns/solid/terms#>.
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
        
        <> a as:Offer;
            schema:license <https://creativecommons.org/licenses/by-sa/4.0/>;
            terms:title "Route share";
            as:summary "undefined";
            as:actor <https://christianpelaez98.solid.community/profile/card#me>;
            as:target <https://viadees4c.solid.community/profile/card#me>;
            as:object <https://christianpelaez98.solid.community/ejemplos/ruta1.ttl>;
            solid:read "true"^^xsd:boolean;
            as:published "2020-03-26T00:57:21.984Z"^^xsd:dateTime.`;

  test("notification to RDF", () => {
    expect(NotificationToRDF.parse(input)).toEqual(output);
  });
});
